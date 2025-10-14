console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
    const button = document.createElement('div');
    // Simplified className to prevent Gmail from overriding the border-radius
    button.className = 'T-I J-J5-Ji v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = '<span>AI Reply</span>';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function getEmailContent() {
    const selectors = [
        '.a3s.aiL', // A more reliable selector for reply content
        '.gmail_quote',
        '.h7',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    // Only return empty after checking ALL selectors
    return '';
}


function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    // Only return null after checking ALL selectors
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Email Writer: Toolbar not found.");
        return;
    }

    console.log("Email Writer: Toolbar found, creating AI button.");
    const button = createAIButton();
    button.classList.add('ai-reply-button'); // Add our custom class

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = '<span>Generating...</span>';
            button.disabled = true;
            button.classList.add('generating');

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error('API Request Failed');
            }

            const generatedReply = await response.text();
            
            // Using the new, more reliable selector for the compose box
            const composeBox = document.querySelector('div[aria-label="Message Body"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
                button.classList.add('success-animation');
                setTimeout(() => button.classList.remove('success-animation'), 500);
            } else {
                console.error("Email Writer: Compose box was not found.");
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply. Is the local server running?');
        } finally {
            button.innerHTML = '<span>AI Reply</span>';
            button.disabled = false;
            button.classList.remove('generating');
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Email Writer: Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});


observer.observe(document.body, {
    childList: true,
    subtree: true
});