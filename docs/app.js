const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

const amountInput = document.getElementById('amount');
const recordedAtInput = document.getElementById('recordedAt');
const noteInput = document.getElementById('note');
const payloadPreview = document.getElementById('payloadPreview');
const typeButtons = [...document.querySelectorAll('#feedingType .seg')];

function toLocalDateTimeValue(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatHm(value) {
  const date = value ? new Date(value) : new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

recordedAtInput.value = toLocalDateTimeValue();

function getFeedingType() {
  return typeButtons.find((btn) => btn.classList.contains('active'))?.dataset.value ?? 'formula';
}

function getFeedingTypeKo() {
  return ({ formula: '분유', breastmilk: '모유', mixed: '혼합' })[getFeedingType()] ?? '분유';
}

function buildCommandText() {
  const amount = Number(amountInput.value || 0);
  const typeKo = getFeedingTypeKo();
  const hm = formatHm(recordedAtInput.value);
  const note = noteInput.value.trim();
  return ['수유기록', `${amount}ml`, typeKo, hm, note].filter(Boolean).join(' ');
}

function renderPayload() {
  payloadPreview.textContent = buildCommandText();
}

for (const btn of typeButtons) {
  btn.addEventListener('click', () => {
    typeButtons.forEach((el) => el.classList.toggle('active', el === btn));
    renderPayload();
  });
}

document.querySelectorAll('.step').forEach((btn) => {
  btn.addEventListener('click', () => {
    const step = Number(btn.dataset.step || 0);
    const next = Math.min(400, Math.max(0, Number(amountInput.value || 0) + step));
    amountInput.value = String(next);
    renderPayload();
  });
});

amountInput.addEventListener('input', renderPayload);
recordedAtInput.addEventListener('input', renderPayload);
noteInput.addEventListener('input', renderPayload);

document.getElementById('setNow').addEventListener('click', () => {
  recordedAtInput.value = toLocalDateTimeValue();
  renderPayload();
});

document.getElementById('copyPayload').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(buildCommandText());
  } catch {}
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  if (tg) tg.close();
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const commandText = buildCommandText();
  if (tg) {
    tg.sendData(commandText);
    tg.close();
    return;
  }
  alert(`Telegram WebApp 환경에서 전송할 텍스트 명령입니다.\n\n${commandText}`);
});

renderPayload();
