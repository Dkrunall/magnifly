import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { createContactHandler } from "./contact.mjs";
const brief = { name: "Test Visitor", email: "visitor@example.com", company: "Example", website: "", services: ["Web Development"], budget: "Not sure yet", timeline: "Just exploring", description: "A website for a sample project inquiry." };
test("contact validation, missing configuration, and transport acceptance", async () => {
  let messages = [];
  const handler = createContactHandler({ env: { CONTACT_FROM: "studio@example.com", CONTACT_TO: "inbox@example.com" }, sendMail: async message => { messages.push(message); return { accepted: ["inbox@example.com"] }; } });
  const server = http.createServer((req,res) => (req.url === "/unconfigured" ? createContactHandler({env:{}}) : handler)(req,res));
  await new Promise(resolve => server.listen(0,"127.0.0.1",resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body, headers = {}) => fetch(url + path, {method:"POST",headers:{"Content-Type":"application/json",...headers},body:JSON.stringify(body)});
  try {
    assert.equal((await post("/",{},{})).status,400);
    assert.equal((await post("/",brief,{Origin:"https://untrusted.example"})).status,403);
    assert.equal((await post("/unconfigured",brief)).status,503);
    assert.equal((await post("/",brief)).status,200);
    assert.equal(messages.length,1);
    assert.equal(messages[0].replyTo,brief.email);
    assert.equal(messages[0].to,"inbox@example.com");
    assert.match(messages[0].text,/Web Development/);
  } finally { server.closeAllConnections(); await new Promise(resolve=>server.close(resolve)); }
});
