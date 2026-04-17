/**
 * Demo 状态控制器 v2
 *
 * 改进：
 *   - 控制按钮放在 iPhone 框体外部（明确是开发工具）
 *   - 内置通用空状态模板 DemoMode.emptyState()，统一文案和 UI
 *   - 面板 + overlay 仍在框体内渲染（贴合真实效果）
 *
 * 用法：
 *   <script src="assets/demo-mode.js"></script>
 *   <script>
 *     DemoMode.register({
 *       empty: {
 *         label: '暂无数据',
 *         panelIcon: '📭',
 *         render(c) { c.innerHTML = DemoMode.emptyState({ title:'暂无数据', desc:'描述文案' }); }
 *       }
 *     });
 *   </script>
 */
;(function () {
  'use strict';

  /* ── 通用空状态 SVG 图标库 ── */
  const EMPTY_ICONS = {
    list: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect x="24" y="28" width="32" height="8" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="1"/>
      <rect x="24" y="40" width="32" height="8" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 3"/>
      <rect x="24" y="52" width="32" height="8" rx="4" fill="#fff" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4 3"/>
    </svg>`,
    search: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="34" cy="34" r="18" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M47 47l14 14" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
    doc: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect x="26" y="22" width="28" height="36" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1.5"/>
      <path d="M33 33h14M33 39h10M33 45h12" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
    chat: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#faf8ff" stroke="#e8e5f0" stroke-width="1.5"/>
      <path d="M28 30c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v14c0 2.2-1.8 4-4 4H38l-6 5v-5h0c-2.2 0-4-1.8-4-4V30z" fill="#fff" stroke="#c4b5fd" stroke-width="1.5"/>
      <circle cx="36" cy="37" r="1.5" fill="#c4b5fd"/><circle cx="40" cy="37" r="1.5" fill="#c4b5fd"/><circle cx="44" cy="37" r="1.5" fill="#c4b5fd"/>
    </svg>`,
    check: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect x="26" y="26" width="28" height="28" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1.5"/>
      <path d="M33 40h14M33 46h10" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="54" cy="54" r="10" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
      <path d="M50 54l3 3 5-6" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    network: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#fef2f2" stroke="#fecaca" stroke-width="1.5"/>
      <path d="M28 52l24-24M52 52L28 28" stroke="#f87171" stroke-width="2" stroke-linecap="round"/>
      <circle cx="40" cy="40" r="12" stroke="#fca5a5" stroke-width="1.5" fill="none"/>
    </svg>`,
    server: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="34" fill="#fff7ed" stroke="#fed7aa" stroke-width="1.5"/>
      <rect x="26" y="30" width="28" height="20" rx="4" stroke="#fb923c" stroke-width="1.5" fill="#fff"/>
      <circle cx="34" cy="40" r="2" fill="#f97316"/><circle cx="46" cy="40" r="2" fill="#f97316"/>
      <path d="M34 46c2 2 10 2 12 0" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  };

  /* ── 通用空状态 HTML 生成器 ── */
  function emptyState(opts) {
    const icon = EMPTY_ICONS[opts.icon || 'list'] || EMPTY_ICONS.list;
    const title = opts.title || '暂无数据';
    const desc = opts.desc || '';
    const action = opts.action || '';
    const actionLabel = opts.actionLabel || '';
    return `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                  height:100%;padding:40px 32px;text-align:center;">
        <div style="margin-bottom:16px;">${icon}</div>
        <div style="font-size:16px;font-weight:700;color:#0f172a;margin-bottom:6px;">${title}</div>
        ${desc ? `<div style="font-size:13px;color:#94a3b8;line-height:1.6;">${desc}</div>` : ''}
        ${actionLabel ? `<button onclick="${action || "DemoMode.set('normal')"}"
          style="margin-top:20px;padding:10px 28px;border-radius:999px;border:1.5px solid rgba(99,102,241,0.3);
                 background:#fff;color:#6366f1;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;">
          ${actionLabel}</button>` : ''}
      </div>`;
  }

  /* ── 内置通用异常 ── */
  const BUILTIN = {
    _networkError: {
      label: '网络异常',
      panelIcon: '📡',
      render(c) {
        c.innerHTML = emptyState({
          icon: 'network', title: '网络开小差了',
          desc: '请检查网络连接后重试', actionLabel: '重新加载'
        });
      }
    },
    _serverError: {
      label: '服务异常',
      panelIcon: '🖥️',
      render(c) {
        c.innerHTML = emptyState({
          icon: 'server', title: '服务器繁忙',
          desc: '系统正在维护中，请稍后再试', actionLabel: '重试'
        });
      }
    },
    _loading: {
      label: '加载中',
      panelIcon: '⏳',
      render(c) {
        c.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;">
            <div style="width:40px;height:40px;border:3px solid #e2e8f0;border-top-color:#8b5cf6;
                        border-radius:50%;animation:demoSpin 0.8s linear infinite;"></div>
            <span style="font-size:14px;color:#94a3b8;">加载中...</span>
          </div>`;
      }
    },
  };

  /* ── 状态容器 ── */
  let registeredStates = {};
  let currentState = 'normal';
  let overlayEl = null;
  let panelEl = null;
  let fabEl = null;
  let styleEl = null;

  /* ── overlay（框体内） ── */
  function getOverlay() {
    if (overlayEl) return overlayEl;
    overlayEl = document.createElement('div');
    overlayEl.id = 'demo-state-overlay';
    overlayEl.style.cssText = `
      position:absolute;inset:0;z-index:800;
      background:var(--app-page-fill, linear-gradient(160deg,#f8fafc 0%,#f1f5f9 55%,#eef2f7 100%));
      display:none;overflow:hidden;
    `;
    const frame = document.querySelector('.iphone-frame') || document.querySelector('#app-root');
    if (frame) {
      frame.style.position = frame.style.position || 'relative';
      frame.appendChild(overlayEl);
    } else {
      document.body.appendChild(overlayEl);
    }
    return overlayEl;
  }

  /* ── 切换状态 ── */
  function setState(name) {
    const overlay = getOverlay();
    if (name === 'normal' || !name) {
      overlay.style.display = 'none';
      overlay.innerHTML = '';
      currentState = 'normal';
      updatePanel();
      updateFab();
      updateURL('normal');
      return;
    }
    const cfg = registeredStates[name] || BUILTIN[name];
    if (!cfg) return;
    overlay.innerHTML = '';
    overlay.style.display = 'block';
    if (cfg.render) cfg.render(overlay);
    currentState = name;
    updatePanel();
    updateFab();
    updateURL(name);
  }

  function updateURL(state) {
    const url = new URL(location.href);
    if (state === 'normal') url.searchParams.delete('demo');
    else url.searchParams.set('demo', state);
    history.replaceState(null, '', url.toString());
  }

  /* ── 注入全局样式 ── */
  function injectStyles() {
    if (styleEl) return;
    styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes demoSpin { to { transform: rotate(360deg); } }
      @keyframes dpSlideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      @keyframes dpFadeIn { from { opacity: 0; } to { opacity: 1; } }

      /* ── FAB：放在框体外（body 层级） ── */
      #demo-fab-outer {
        position: fixed; z-index: 9999;
        display: flex; align-items: center; gap: 8px;
        cursor: pointer; -webkit-tap-highlight-color: transparent;
        user-select: none;
      }
      #demo-fab-outer .dfab-btn {
        width: 36px; height: 36px; border-radius: 10px;
        background: #18181b; color: #a1a1aa; border: 1px solid #333;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.15s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-family: inherit; font-size: 12px;
      }
      #demo-fab-outer .dfab-btn:hover { background: #27272a; color: #e4e4e7; }
      #demo-fab-outer .dfab-btn:active { transform: scale(0.92); }
      #demo-fab-outer .dfab-label {
        font-size: 11px; color: #71717a; font-weight: 600;
        background: #18181b; padding: 4px 10px; border-radius: 6px;
        border: 1px solid #333; white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      #demo-fab-outer.has-state .dfab-btn {
        background: #dc2626; color: #fff; border-color: #b91c1c;
      }
      #demo-fab-outer.has-state .dfab-label {
        background: #dc2626; color: #fff; border-color: #b91c1c;
      }

      /* ── 面板（框体内） ── */
      #demo-panel { display:none; position:absolute; inset:0; z-index:900; }
      #demo-panel.open { display:block; }
      #demo-panel .dp-mask {
        position:absolute; inset:0; background:rgba(0,0,0,0.25);
        animation: dpFadeIn 0.2s ease;
      }
      #demo-panel .dp-sheet {
        position:absolute; bottom:0; left:0; right:0;
        background:#fff; border-radius:20px 20px 0 0;
        padding:20px 20px calc(env(safe-area-inset-bottom,0px) + 20px);
        max-height:75%; overflow-y:auto;
        animation: dpSlideUp 0.3s cubic-bezier(0.16,1,0.3,1);
        box-shadow:0 -8px 32px rgba(0,0,0,0.1);
      }
      #demo-panel .dp-title { font-size:15px; font-weight:700; color:#0f172a; margin-bottom:4px; }
      #demo-panel .dp-subtitle { font-size:12px; color:#94a3b8; margin-bottom:16px; }
      #demo-panel .dp-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      #demo-panel .dp-item {
        padding:14px 12px; border-radius:14px; border:1.5px solid #e2e8f0;
        background:#fafafa; cursor:pointer; text-align:center;
        font-size:13px; font-weight:600; color:#334155;
        transition:all 0.15s; font-family:inherit;
        display:flex; flex-direction:column; align-items:center; gap:6px;
      }
      #demo-panel .dp-item:active { transform:scale(0.97); }
      #demo-panel .dp-item.active {
        border-color:#8b5cf6; background:rgba(139,92,246,0.06); color:#6d28d9;
      }
      #demo-panel .dp-item .dp-icon { font-size:22px; line-height:1; }
      #demo-panel .dp-item .dp-label { font-size:12px; line-height:1.3; }
      #demo-panel .dp-divider { height:1px; background:#f1f5f9; margin:14px 0; }
      #demo-panel .dp-section-label {
        font-size:11px; font-weight:600; color:#94a3b8;
        text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;
      }
    `;
    document.head.appendChild(styleEl);
  }

  /* ── FAB 按钮（框体外部，body 层级） ── */
  function createFab() {
    if (fabEl) return;
    injectStyles();

    fabEl = document.createElement('div');
    fabEl.id = 'demo-fab-outer';
    fabEl.style.cssText = 'right:24px; bottom:80px;';

    fabEl.innerHTML = `
      <div class="dfab-btn" title="切换异常状态">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1z" stroke="currentColor" stroke-width="1.2"/>
          <path d="M8 4v4l2.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      </div>
      <span class="dfab-label">Demo</span>
    `;

    fabEl.addEventListener('click', togglePanel);
    document.body.appendChild(fabEl);
  }

  function updateFab() {
    if (!fabEl) return;
    fabEl.classList.toggle('has-state', currentState !== 'normal');
    const label = fabEl.querySelector('.dfab-label');
    if (currentState !== 'normal') {
      const cfg = registeredStates[currentState] || BUILTIN[currentState];
      label.textContent = cfg ? cfg.label : currentState;
    } else {
      label.textContent = 'Demo';
    }
  }

  /* ── 面板（框体内） ── */
  function createPanel() {
    if (panelEl) return;
    panelEl = document.createElement('div');
    panelEl.id = 'demo-panel';
    panelEl.innerHTML = `<div class="dp-mask"></div><div class="dp-sheet"></div>`;

    const frame = document.querySelector('.iphone-frame') || document.querySelector('#app-root') || document.body;
    frame.style.position = frame.style.position || 'relative';
    frame.appendChild(panelEl);

    panelEl.querySelector('.dp-mask').addEventListener('click', () => {
      panelEl.classList.remove('open');
    });
  }

  function togglePanel() {
    createPanel();
    updatePanel();
    panelEl.classList.toggle('open');
  }

  function updatePanel() {
    if (!panelEl) return;
    const sheet = panelEl.querySelector('.dp-sheet');
    const pageItems = Object.entries(registeredStates);
    const builtinItems = Object.entries(BUILTIN);

    let html = `
      <div class="dp-title">Demo 状态切换</div>
      <div class="dp-subtitle">切换当前页面的显示状态，演示异常流程</div>
      <div class="dp-grid">
        <div class="dp-item ${currentState === 'normal' ? 'active' : ''}" data-state="normal">
          <span class="dp-icon">✅</span><span class="dp-label">正常状态</span>
        </div>`;

    pageItems.forEach(([key, cfg]) => {
      html += `<div class="dp-item ${currentState === key ? 'active' : ''}" data-state="${key}">
        <span class="dp-icon">${cfg.panelIcon || '📋'}</span><span class="dp-label">${cfg.label}</span>
      </div>`;
    });
    html += `</div>`;

    if (builtinItems.length > 0) {
      html += `<div class="dp-divider"></div><div class="dp-section-label">通用异常</div><div class="dp-grid">`;
      builtinItems.forEach(([key, cfg]) => {
        html += `<div class="dp-item ${currentState === key ? 'active' : ''}" data-state="${key}">
          <span class="dp-icon">${cfg.panelIcon}</span><span class="dp-label">${cfg.label}</span>
        </div>`;
      });
      html += `</div>`;
    }

    sheet.innerHTML = html;
    sheet.querySelectorAll('.dp-item').forEach(item => {
      item.addEventListener('click', () => {
        setState(item.dataset.state);
        setTimeout(() => panelEl.classList.remove('open'), 200);
      });
    });
  }

  /* ── 初始化 ── */
  function init() {
    createFab();
    const demoParam = new URLSearchParams(location.search).get('demo');
    if (demoParam && demoParam !== 'normal') {
      setTimeout(() => setState(demoParam), 300);
    }
  }

  /* ── 公开 API ── */
  window.DemoMode = {
    register(states) {
      Object.assign(registeredStates, states);
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    },
    set(name) { setState(name); },
    get current() { return currentState; },
    emptyState: emptyState,
    icons: EMPTY_ICONS,
  };

})();
