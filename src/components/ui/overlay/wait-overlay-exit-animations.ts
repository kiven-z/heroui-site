/**
 * 等待 overlay 子树退出动画结束；返回 cancel，供 useEffect cleanup。
 */
export function waitOverlayExitAnimations(node: Element | null, onDone: () => void): () => void {
  let cancelled = false;

  const finish = () => {
    if (!cancelled) {
      onDone();
    }
  };

  const cancel = () => {
    cancelled = true;
  };

  if (!node) {
    finish();

    return cancel;
  }

  const animations = node.getAnimations({ subtree: true });

  if (animations.length === 0) {
    finish();

    return cancel;
  }

  void Promise.all(animations.map((animation) => animation.finished.catch(() => undefined))).then(finish);

  return cancel;
}
