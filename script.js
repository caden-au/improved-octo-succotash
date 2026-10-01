const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  mobileNav.hidden = !open;
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开菜单');
}));
document.querySelector('#copy-brief')?.addEventListener('click', async () => {
  const brief = '朗昱林别墅电梯咨询\n所在城市与项目位置：\n房屋状态（新建/既有）：\n预计服务楼层：\n是否有建筑图纸：\n其他需求：';
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(brief); status.textContent = '咨询清单已复制，可粘贴后填写。'; }
  catch { status.textContent = '复制未成功。请手动记录上方三项信息。'; }
});
document.querySelector('#year').textContent = new Date().getFullYear();

const consultTrigger = document.querySelector('.consult-trigger');
const consultPanel = document.querySelector('#consult-panel');
const consultClose = document.querySelector('.consult-close');
const consultLink = document.querySelector('#consult-wecom');
const consultPending = document.querySelector('#consult-pending');
const configuredUrl = window.LONGYULIN_CUSTOMER_SERVICE?.wecomUrl?.trim() || '';
let validWecomUrl = '';
try {
  const url = new URL(configuredUrl);
  if (url.protocol === 'https:' && url.hostname === 'work.weixin.qq.com' && url.pathname.startsWith('/kfid/')) {
    validWecomUrl = url.href;
  }
} catch (_) { /* No customer-service URL has been configured yet. */ }
if (validWecomUrl) {
  consultLink.href = validWecomUrl;
  consultLink.hidden = false;
  consultPending.hidden = true;
}
function setConsultOpen(open) {
  consultPanel.hidden = !open;
  consultTrigger.setAttribute('aria-expanded', String(open));
  consultTrigger.querySelector('.consult-plus').textContent = open ? '−' : '＋';
  if (open) consultClose.focus();
  else consultTrigger.focus();
}
consultTrigger.addEventListener('click', () => setConsultOpen(consultPanel.hidden));
consultClose.addEventListener('click', () => setConsultOpen(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !consultPanel.hidden) setConsultOpen(false);
});
document.addEventListener('pointerdown', (event) => {
  if (!consultPanel.hidden && !event.target.closest('.consult-widget')) setConsultOpen(false);
});
