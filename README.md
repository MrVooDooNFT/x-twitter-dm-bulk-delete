# X (Twitter) DM Bulk Delete

Bulk delete X (Twitter) DM conversations directly from your browser.

This script uses the current X Chat interface and automatically deletes conversations one by one.

## What It Does

The script automatically performs the following steps:

1. Opens the first conversation in your X Chat list.
2. Opens the conversation options.
3. Opens the additional **More** menu.
4. Selects **Delete conversation**.
5. Confirms the deletion.
6. Repeats the process for the next conversation.

## Requirements

* You must be logged in to X.
* The X interface language should be **English** because the script currently looks for interface labels such as:

  * `More`
  * `Delete conversation`
  * `Confirm`
* Use the current X Chat interface.

## Open X Chat

Go to:

```text
https://x.com/i/chat
```

Make sure your DM conversation list is visible.

## How to Run

Open the X Chat page:

```text
https://x.com/i/chat
```

Then open your browser's Developer Tools and switch to the **Console** tab.

Copy the entire contents of:

```text
delete-x-dms.js
```

Paste it into the Console and press **Enter**.

The script will start deleting conversations automatically.

You should see output similar to:

```text
X DM bulk delete started...
Deleted: 1
Deleted: 2
Deleted: 3
```

## Opening the Browser Console

### Chrome

Keyboard shortcut:

```text
Ctrl + Shift + J
```

On macOS:

```text
Command + Option + J
```

Without using a keyboard shortcut:

1. Right-click anywhere on the X page.
2. Click **Inspect**.
3. Open the **Console** tab.

### Microsoft Edge

Keyboard shortcut:

```text
Ctrl + Shift + J
```

Without using a keyboard shortcut:

1. Right-click anywhere on the page.
2. Click **Inspect**.
3. Open the **Console** tab.

### Firefox

Keyboard shortcut:

```text
Ctrl + Shift + K
```

On macOS:

```text
Command + Option + K
```

Without using a keyboard shortcut:

1. Right-click anywhere on the page.
2. Click **Inspect** or **Inspect Accessibility Properties**, depending on the browser version.
3. Open the **Console** tab.

You can also open Developer Tools from:

```text
Menu → More tools → Web Developer Tools
```

### Brave

Keyboard shortcut:

```text
Ctrl + Shift + J
```

Without using a keyboard shortcut:

1. Right-click anywhere on the page.
2. Click **Inspect**.
3. Open the **Console** tab.

### Opera

Keyboard shortcut:

```text
Ctrl + Shift + J
```

Without using a keyboard shortcut:

1. Right-click anywhere on the page.
2. Click **Inspect element**.
3. Open the **Console** tab.

## Important: Close Developer Tools After Starting

After you paste the script and press **Enter**, you can close Developer Tools.

The script will continue running in the X tab.

Closing Developer Tools is recommended because keeping the Console open may cause X to continuously display internal network errors or messages such as:

```text
Too Many Requests
```

These messages do not necessarily mean the deletion script has stopped.

After starting the script:

1. Press **Enter**.
2. Confirm that deletion has started.
3. Close Developer Tools.
4. Leave the X tab open.

Do not refresh or close the X tab while the script is running.

## Notes

The X tab does not need to remain in the foreground.

You can switch to another browser tab while the script continues running.

However:

* Do not close the X tab.
* Do not refresh the X page.
* Do not navigate away from X Chat.
* Background browser tabs may run JavaScript timers more slowly, so deletion may become slower.

## Stopping the Script

The easiest way to stop the script is to refresh the X page:

```text
F5
```

or close the X tab.

## Troubleshooting

### Panel More button not found

If you see:

```text
Panel More button not found
```

the X interface may not have finished loading the conversation information panel.

The script already waits and retries several times, but X may occasionally load some conversations more slowly.

### Too Many Requests

You may see X-generated messages such as:

```text
Too Many Requests
```

in the browser Console.

These messages can come from X's own background requests and do not automatically mean that the DM deletion process has failed.

Close Developer Tools after starting the script to avoid unnecessary Console noise.

### The script stops after several failures

The script stops after repeated consecutive failures to prevent an infinite loop.

Refresh:

```text
https://x.com/i/chat
```

and run the script again.

## Warning

Deleted conversations cannot be restored through this script.

Use it only if you are sure you want to remove your DM conversations.

## Disclaimer

This project is not affiliated with, endorsed by, or maintained by X Corp.

X may change its website structure at any time. Such changes can cause this script to stop working until its selectors or workflow are updated.
