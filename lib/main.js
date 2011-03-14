var pageMod = require("page-mod");
pageMod.PageMod({
  include: "http://htmlpad.org/*",
  contentScriptWhen: "ready",
  contentScriptFile: require("self").data.url("editormod.js")
});
