import{y as i}from"./js-yaml-Dzr747z0.js";import{v as c}from"./app-Cuf7bTDT.js";function l(t){var s;const r=i.dump(t,{noRefs:!0,lineWidth:-1,sortKeys:!1}).trimEnd(),n=((s=c(t).transcript)==null?void 0:s.text)??"",o=a(t);return`---
${r}
---

${n}
${o}`}function a(t){return t.corrections.length===0?"":`
---

## Corrections

${t.corrections.map(e=>{const n=e.type==="amend"&&e.fields?` — changed: ${Object.keys(e.fields).join(", ")}`:"",o=e.reason?` — ${e.reason}`:"";return`- ${e.created_at} (${e.type})${n}${o}`}).join(`
`)}
`}export{l as serializeEntry};
