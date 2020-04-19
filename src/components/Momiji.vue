<template>
    <div class="momiji-outer"
         @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd">

        <div v-if="!stopPrevious"
             class="momiji-navigation-container momiji-navigation-container-left">
            <div class="momiji-navigation momiji-navigation-left"
                 :class="{'momiji-navigation-left-hover': isShowLeftNavigation}"
                 @touchstart.prevent
                 @mouseenter="isShowLeftNavigation = true"
                 @mouseleave="isShowLeftNavigation = false">
                <div class="momiji-navigation-icon momiji-navigation-icon-left"
                     @touchstart.prevent
                     @click="swipeToRight">
                    <div class="momiji-icon-frame momiji-icon-frame-left">
                        <img src="/img/less-than-solid.svg" alt="previous">
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!stopNext"
             class="momiji-navigation-container momiji-navigation-container-right">
            <div class="momiji-navigation momiji-navigation-right"
                 :class="{'momiji-navigation-right-hover': isShowRightNavigation}"
                 @touchstart.prevent
                 @mouseenter="isShowRightNavigation = true"
                 @mouseleave="isShowRightNavigation = false">
                <div class="momiji-navigation-icon momiji-navigation-icon-right"
                     @touchstart.prevent
                     @click="swipeToLeft">
                    <div class="momiji-icon-frame momiji-icon-frame-right">
                        <img src="/img/greater-than-solid.svg" alt="next">
                    </div>
                </div>
            </div>
        </div>

        <div class="momiji-container momiji-previous"
             v-if="!stopPrevious"
             :style="style">
            <slot name="previous"/>
        </div>

        <div class="momiji-container"
             :style="style">
            <slot name="focus"/>
        </div>

        <div class="momiji-container momiji-next"
             v-if="!stopNext"
             :style="style">
            <slot name="next"/>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import MomijiPosition from "~/src/models/MomijiPosition";

    @Component
    export default class Momiji extends Vue {
        @Prop({type: Number, default: 120})
        sensibility!: number;

        @Prop({type: Boolean, default: false})
        stopNext!: boolean;

        @Prop({type: Boolean, default: false})
        stopPrevious!: boolean;

        @Prop({type: Boolean, default: false})
        disableHorizontal!: boolean;

        @Prop({type: Boolean, default: false})
        disableVertical!: boolean;

        position!: MomijiPosition;
        isDragging = false;
        isAnimating = false;

        isSnapHorizontal = false;
        isSnapVertical = false;

        dx: number = 0;
        dy: number = 0;

        isShowRightNavigation: boolean = false;
        isShowLeftNavigation: boolean = false;

        /**
         * 要素を動かすスタイルシート
         */
        get style() {
            return {
                transform: `translate(${this.dx}px, ${this.dy}px)`,
                transition: `transform ${this.isAnimating ? '200ms' : '0ms'}`
            };
        }

        /**
         * 水平・垂直固定が設定されているかどうか
         */
        get wasSetSnap(): boolean {
            return this.isSnapHorizontal || this.isSnapVertical;
        }

        /**
         * 移動量をゼロに戻す
         */
        resetPosition() {
            this.dx = 0;
            this.dy = 0;

            this.isSnapHorizontal = false;
            this.isSnapVertical = false;
        }

        /**
         * @see https://qiita.com/yukiTTT/items/773356c2483b96c9d4e0
         * @param event
         */
        handleTouchMove(event: any): void {
            event.preventDefault();
        }

        /**
         * ドラッグ操作開始イベントのハンドラ
         * @param event
         */
        dragStart(event: Event): void {
            if (event instanceof TouchEvent) {
                this.position = new MomijiPosition(event.touches[0].pageX, event.touches[0].pageY);
                this.position.finger = 0;
                document.addEventListener('touchmove', this.handleTouchMove, {passive: false});
                this.isDragging = true;
            }
        }

        /**
         * ドラッグ操作中イベントのハンドラ
         * @param event
         */
        dragging(event: Event): void {
            if (event instanceof TouchEvent) {
                this.position.event = event;

                // スナップ設定
                if (!this.wasSetSnap) {
                    if (Math.abs(this.position.distanceX) > Math.abs(this.position.distanceY)) {
                        this.isSnapHorizontal = true;
                    } else {
                        this.isSnapVertical = true;
                    }
                }

                // 座標移動
                if (this.wasSetSnap) {
                    if (this.isSnapHorizontal) {
                        this.dx = this.position.distanceX;
                    } else if (this.isSnapVertical) {
                        this.dy = this.position.distanceY;
                    }
                }

            }
        }

        /**
         * ドラッグ操作終了イベントのハンドラ
         * @param event
         */
        dragEnd(event: Event): void {
            if (event instanceof TouchEvent
            ) {
                this.position.event = event;

                document.removeEventListener('touchmove', this.handleTouchMove);
                this.isDragging = false;

                switch (this.SwipeDirection) {
                    case Direction.left:
                        this.swipeToLeft();
                        break;

                    case Direction.right:
                        this.swipeToRight();
                        break;

                    case Direction.up:
                        console.log('swipe up');
                        this.backToCenter();
                        break;

                    case Direction.down:
                        console.log('swipe down');
                        this.backToCenter();
                        break;

                    default:
                        this.backToCenter();
                }

                this.isSnapHorizontal = false;
                this.isSnapVertical = false;
            }
        }

        /**
         * 左へスワイプするアニメーションを再生
         */
        async swipeToLeft() {
            this.dx = -(window.innerWidth + 10);

            this.isAnimating = true;
            await this.waitForMS(200);
            this.isAnimating = false;

            this.$emit("swipeToLeft");
            this.resetPosition();
        }

        /**
         * 右へスワイプするアニメーションを再生
         */
        async swipeToRight() {
            this.dx = window.innerWidth + 10;

            this.isAnimating = true;
            await this.waitForMS(200);
            this.isAnimating = false;

            this.$emit('swipeToRight');
            this.resetPosition();
        }

        /**
         * 中央へ要素を戻すアニメーションを再生
         */
        async backToCenter() {
            this.resetPosition();

            this.isAnimating = true;
            await this.waitForMS(200);
            this.isAnimating = false;
        }

        /**
         * 指定ミリ秒待つ
         * @param ms 待機させる時間
         */
        waitForMS(ms: number): Promise<void> {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }

        /**
         * スワイプしている方向を取得
         * @constructor
         */
        get SwipeDirection(): Direction | null {
            if (this.dx > this.sensibility && !this.stopPrevious) {
                return Direction.right;
            } else if (this.dx < -this.sensibility && !this.stopNext) {
                return Direction.left;
            } else if (this.dy > this.sensibility) {
                return Direction.down;
            } else if (this.dy < -this.sensibility) {
                return Direction.up;
            } else {
                return null;
            }
        }

        test() {
            console.log('click!');
        }
    };

    /**
     * スワイプ方向Enum
     */
    enum Direction {
        left,
        right,
        up,
        down
    }
</script>

<style scoped>
    .momiji-outer {
        overflow: hidden;
        position: relative;
    }

    .momiji-container {
        width: 100%;
        height: 100%;

        position: absolute;
        display: flex;
        align-items: center;
    }

    .momiji-previous {
        left: -100vw;
        margin-left: -10px;
    }

    .momiji-next {
        left: 100vw;
        margin-left: 10px;
    }

    /*
       navigations
     */

    .momiji-navigation-container {
        position: absolute;
        height: 100%;
        width: 10rem;
        overflow: hidden;
    }

    .momiji-navigation-container-right {
        right: 0;
    }

    .momiji-navigation-container-left {
        left: 0;
    }

    .momiji-navigation {
        position: absolute;
        height: 100%;
        width: 20rem;
        z-index: 5;

        /*background-color: rgba(127, 127, 127, 0.7);*/
        transition: transform 200ms ease-in-out;
    }

    .momiji-navigation-right {
        right: -10rem;
    }

    .momiji-navigation-right-hover {
        transform: translate(-10rem, 0);
    }

    .momiji-navigation-left {
        left: -10rem;
    }

    .momiji-navigation-left-hover {
        transform: translate(10rem, 0);
    }

    .momiji-navigation-icon {
        position: absolute;

        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 10rem;
    }

    .momiji-icon-frame {
        width: 3rem;
        height: 3rem;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 1.5rem;

        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }

    .momiji-icon-frame > img {
        padding: 0.5rem;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        user-select: none;
    }

    .momiji-icon-frame-right {
        margin-left: 5rem;
    }

    .momiji-icon-frame-left {
        margin-right: 5rem;
    }

    .momiji-navigation-icon-right {
        right: 0;
    }
</style>