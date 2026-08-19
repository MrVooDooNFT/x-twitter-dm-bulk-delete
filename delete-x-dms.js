(async function deleteAllXChats() {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  let deleted = 0;
  let failed = 0;

  const isVisible = element =>
    element &&
    element.offsetParent !== null &&
    getComputedStyle(element).visibility !== "hidden";

  const findVisible = selector =>
    [...document.querySelectorAll(selector)].find(isVisible);

  const findVisibleByText = (selector, text) =>
    [...document.querySelectorAll(selector)].find(element =>
      isVisible(element) &&
      (element.innerText || "").trim().startsWith(text)
    );

  async function waitFor(callback, timeout = 6000, interval = 250) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const result = callback();

      if (result) {
        return result;
      }

      await sleep(interval);
    }

    return null;
  }

  async function deleteCurrentConversation() {
    const conversationMoreButton = await waitFor(() =>
      findVisible('[data-testid="dm-conversation-more-button"]')
    );

    if (!conversationMoreButton) {
      console.log("Conversation More button not found.");
      return false;
    }

    conversationMoreButton.click();

    const panelMoreButton = await waitFor(() =>
      [...document.querySelectorAll('button,[role="button"]')].find(
        element =>
          isVisible(element) &&
          element.getAttribute("aria-label") === "More" &&
          element.getAttribute("data-testid") !==
            "dm-conversation-more-button"
      )
    );

    if (!panelMoreButton) {
      console.log("Panel More button not found:", location.href);
      return false;
    }

    panelMoreButton.click();

    const deleteButton = await waitFor(() =>
      findVisibleByText(
        '[role="menuitem"],button,[role="button"]',
        "Delete conversation"
      )
    );

    if (!deleteButton) {
      console.log("Delete conversation option not found.");
      return false;
    }

    deleteButton.click();

    const confirmButton = await waitFor(() =>
      findVisibleByText(
        'button,[role="button"]',
        "Confirm"
      )
    );

    if (!confirmButton) {
      console.log("Confirm button not found.");
      return false;
    }

    confirmButton.click();

    return true;
  }

  console.log("X DM bulk delete started...");

  while (true) {
    const conversation = await waitFor(
      () =>
        document.querySelector(
          '[data-testid^="dm-conversation-item-"]'
        ),
      3000
    );

    if (!conversation) {
      console.log(`Finished. Deleted ${deleted} conversations.`);
      break;
    }

    const conversationId =
      conversation.getAttribute("data-testid");

    const conversationLink =
      conversation.querySelector("a");

    if (!conversationLink) {
      console.log(
        "Conversation link not found:",
        conversationId
      );
      break;
    }

    conversationLink.click();

    await waitFor(
      () => location.pathname.includes("/i/chat/"),
      4000
    );

    await sleep(500);

    let success = false;

    for (let attempt = 1; attempt <= 3; attempt++) {
      success = await deleteCurrentConversation();

      if (success) {
        break;
      }

      console.log(
        `Retrying (${attempt}/3):`,
        conversationId
      );

      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          code: "Escape",
          bubbles: true
        })
      );

      await sleep(800);
    }

    if (success) {
      deleted++;
      failed = 0;

      console.log(`Deleted: ${deleted}`);

      await sleep(1200);
    } else {
      failed++;

      console.log(
        "Could not delete conversation:",
        conversationId
      );

      if (failed >= 3) {
        console.log(
          "Stopped after 3 consecutive failures."
        );
        break;
      }

      await sleep(1000);
    }
  }

  console.log(
    `Process finished. Total deleted conversations: ${deleted}`
  );
})();
