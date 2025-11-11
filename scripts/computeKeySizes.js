const viewports = [360, 419, 420];
const gap = 4;
const padding = 24; // left+right padding used in calc
const specialMult = 1.15;

viewports.forEach((w) => {
  const cont = w - 24; // keyboard width calc uses viewport - 24px in our CSS
  const keyW = (cont - (9 * gap) - padding) / 10;
  const special = keyW * specialMult;
  const row3Content = 7 * keyW + 2 * special + 8 * gap; // 9 items -> 8 gaps
  const inner = cont - padding; // inner available width after padding
  console.log(`vp ${w} | container ${cont.toFixed(2)}px | keyW ${keyW.toFixed(2)}px | special ${special.toFixed(2)}px | row3 ${row3Content.toFixed(2)}px | inner ${inner.toFixed(2)}px | fits ${row3Content <= inner}`);
});
