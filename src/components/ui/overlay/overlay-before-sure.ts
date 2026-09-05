/** {@link runOverlayBeforeSure} 上下文 */
interface OverlayBeforeSureContext<TOptions> {
  options: TOptions;
  id: string;
  /** 手动关闭确定按钮 loading；未调用 `done` 时壳层会在 `beforeSure` 结束后自动关闭 */
  closeLoading: () => void;
}

/** {@link runOverlayBeforeSure} 参数 */
interface RunOverlayBeforeSureOptions<TOptions extends object> {
  beforeSure: (done: () => void, context: OverlayBeforeSureContext<TOptions>) => void | Promise<void>;
  loadingEnabled: boolean;
  setConfirmLoading: (loading: boolean) => void;
  onDone: () => void;
  options: TOptions;
  id: string;
}

/** 按弹层 options 实例跟踪提交中状态，支持多弹层叠放 */
const overlaySureInFlight = new WeakMap<object, boolean>();

/**
 * 执行弹层确定回调：防重入 → loading → beforeSure → done 关闭弹层；未 done 时自动复位 loading
 */
export function runOverlayBeforeSure<TOptions extends object>(params: RunOverlayBeforeSureOptions<TOptions>): void {
  const { beforeSure, loadingEnabled, setConfirmLoading, onDone, options, id } = params;

  if (overlaySureInFlight.get(options)) {
    return;
  }

  overlaySureInFlight.set(options, true);

  const releaseInFlight = () => {
    overlaySureInFlight.delete(options);
  };

  if (loadingEnabled) {
    setConfirmLoading(true);
  }

  const closeLoading = () => {
    if (loadingEnabled) {
      setConfirmLoading(false);
    }
  };

  let sureCompleted = false;
  const done = () => {
    if (sureCompleted) {
      return;
    }

    sureCompleted = true;
    closeLoading();
    onDone();
  };

  Promise.resolve(beforeSure(done, { options, id, closeLoading })).finally(() => {
    releaseInFlight();

    if (!sureCompleted) {
      closeLoading();
    }
  });
}
