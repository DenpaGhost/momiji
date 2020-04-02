<template>
    <div class="momiji-outer"
         @touchstart="dragStart"
         @touchmove="dragging"
         @touchend="dragEnd">

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
    export default class MomijiSwipeableBox extends Vue {
        @Prop({type: Boolean, default: true})
        snap!: boolean;

        @Prop({type: Number, default: 120})
        sensibility!: number;

        @Prop({type: Boolean, default: false})
        stopNext!: boolean;

        @Prop({type: Boolean, default: false})
        stopPrevious!: boolean;

        position!: MomijiPosition;
        isDragging = false;
        isAnimating = false;

        isSnapHorizontal = false;
        isSnapVertical = false;

        dx: number = 0;
        dy: number = 0;

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
                if (this.snap && !this.wasSetSnap) {
                    if (Math.abs(this.position.distanceX) > Math.abs(this.position.distanceY)) {
                        this.isSnapHorizontal = true;
                    } else {
                        this.isSnapVertical = true;
                    }
                }

                // 座標移動
                if (this.snap) {
                    if (this.wasSetSnap) {
                        if (this.isSnapHorizontal) {
                            this.dx = this.position.distanceX;
                        } else if (this.isSnapVertical) {
                            this.dy = this.position.distanceY;
                        }
                    }
                } else {
                    this.dx = this.position.distanceX;
                    this.dy = this.position.distanceY;
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
            this.dx = -(window.parent.screen.width + 10);

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
            this.dx = window.parent.screen.width + 10;

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
                this.dx = window.parent.screen.width + 10;
                return Direction.right;
            } else if (this.dx < -this.sensibility && !this.stopNext) {
                this.dx = -(window.parent.screen.width + 10);
                return Direction.left;
            } else if (this.dy > this.sensibility) {
                return Direction.down;
            } else if (this.dy < -this.sensibility) {
                return Direction.up;
            } else {
                return null;
            }
        }
    }

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
</style>