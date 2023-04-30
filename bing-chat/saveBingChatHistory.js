const chat = [];

let saveBingChatHistory = (shadowRootHost = document) => {
  for (const { shadowRoot } of shadowRootHost.querySelectorAll('*')) {
    if (shadowRoot) {
      if (shadowRoot.host.localName === 'cib-message') {
        const type = shadowRoot.host.getAttribute('type');
        if (type === 'text') {
          const from = shadowRoot.host.getAttribute('source');
          const htmlContent =
            from === 'user'
              ? shadowRoot.querySelector('cib-shared > div.content').innerHTML
              : Array.from(
                  shadowRoot.querySelectorAll(
                    'cib-shared > div.content p, cib-shared > div.text-message-content'
                  )
                ).map((node) => node.innerHTML);
          chat.push({ from, htmlContent });
        }
      }
      saveBingChatHistory(shadowRoot);
    }
  }
};
