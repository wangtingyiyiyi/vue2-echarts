<template>
  <div class="text-second">
    正在计算<span class="dotting"></span>
  </div>
</template>

<style lang="stylus" scoped>
.dotting {
    display: inline-block; width: 10px; min-height: 2px;
    padding-right: 2px;
    border-left: 2px solid currentColor; border-right: 2px solid currentColor;
    background-color: currentColor; background-clip: content-box;
    box-sizing: border-box;
    animation: dot 2s infinite step-start both;
}
.dotting:before { content: '...'; }
.dotting::before { content: ''; }
:root .dotting { margin-left: 2px; padding-left: 2px; }

@keyframes dot {
    25% { border-color: transparent; background-color: transparent; }
    50% { border-right-color: transparent; background-color: transparent; }
    75% { border-right-color: transparent; }
}
</style>
