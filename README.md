# Nona AI

🚨 ***Gemini Nano is an experiment which frequently has unexpected breaking changes to its API. Because of these changes Nona AI's prompt interface may not work optimally at all times. For instance, as of this writing on December 20, 2024 a prompt which contains numerical digits in its text (i.e. "What's 2 + 2?") will likely cause an error, but a prompt such as "What's two plus two" or "What's two + two?" will likely return a coherent result. I'm working to stay on top of these developments.*** 🚨

## A registration-free user interface for Google Gemini Nano that also works offline

Are you curious about artificial intelligence (AI)? Are you looking to experiment with AI but don't want to register for yet another online account?

Nona AI is a user interface (UI) I've made that connects to [Google's built-in AI model: Gemini Nano for Chrome](https://developer.chrome.com/docs/ai/built-in). Type your prompts into Nona AI's text input, then get text results back from Gemini Nano &mdash; similar to other browser-based large language model (LLM) interfaces like Google Gemini and ChatGPT.

However, **unlike** most other LLM interfaces Nona AI doesn't require any kind of account registration or sign up process. There's no need to provide your email address, name or any other personal information. Just use the correct web browser and properly configure it with a few quick steps.

Currently Gemini Nano is an experimental, built-in feature of Google's Chrome browser. It also works in Google's Chrome Dev browser &mdash; and was available there first. Be sure you have the latest version of Chrome or Chrome Dev installed on your computer to use Nona AI for connecting with Gemini Nano. Once you've configured your browser using the steps below then you're ready to start making prompts.

After configuring Chrome you'll have the option to use Nona AI with no internet signal, completely offline! Such is the built-in nature of the AI model.

### How to configure your browser for Nona AI

- Install [Chrome](https://www.google.com/chrome) or [Chrome Dev](https://www.google.com/chrome/dev) browser on your computer

- If one of these browsers is already installed then confirm it's [updated](https://support.google.com/chrome/answer/95414) to the latest version and that your machine's operating system is also up to date.

- Open Chrome or Chrome Dev browser

- Configure the browser to connect with Gemini Nano by following these steps to set the correct flags:

1) Go to **[chrome://flags/#prompt-api-for-gemini-nano](chrome://flags/#prompt-api-for-gemini-nano)** and then select 'Enabled'

2) Go to **[chrome://flags/#optimization-guide-on-device-model](chrome://flags/#optimization-guide-on-device-model)** and then select 'Enabled BypassPrefRequirement'

3) Go to **[chrome://components](chrome://components)** and click 'Check for Update' on *Optimization Guide On Device Model* to download the model. If you don't see Optimization Guide, ensure you have set the flags correctly above. If you still don't see Optimization Guide, run `await window.ai.assistant.create();` in your browser console, then refresh the page.

    *These steps for browser configuration are originally from [here](https://ai-sdk-chrome-ai.vercel.app/).*

### Using Nona AI

- In your Chrome or Chrome Dev browser navigate to [Nona AI](https://alect.me/nona-ai).  Note: If you use a different browser than Chrome or Chrome Dev you may see the Nona AI interface as expected and even be able to submit prompts&hellip; but you won't get results. You'll simply wait.

- Type a prompt in the input field: Start with something simple like "What's 2 + 2?" If you get a corresponding result you'll know Nona AI is working as expected.

### Caveats

Be patient and forewarned. Google's [Built-in AI](https://developer.chrome.com/docs/ai/built-in) description states, "**Important**: This implementation of built-in AI with Gemini Nano is an experiment and will change as we test and address feedback."

The experimental reality of Gemini Nano means you may experience occasional performance issues, like longer than expected wait times after your prompt submission. You may also encounter strange/nonsensical/incomplete wording in the resulting text.

 While I built Nona AI from scratch on the front end as a UI for interacting with Gemini Nano I don't have a professional partnership with Google. I can't control Gemini Nano on the back end: I can neither alter Gemini Nano's behavior nor optimize its performance. If the wait time for a result becomes too long then hit the stop button to cancel your prompt

Regarding content, I have no say in how Google uses your prompts. I also can't claim authorship of Gemini Nano's resulting text. Keep the following in mind when using Nona AI:
- You acknowledge the prompts you submit are sent to Google for the company's use
- You take full responsibility for your prompts, including any attempts on your part to send malicious code to Google
- You take full responsibility for how you use the resulting content generated by Google
- If you have strong thoughts on any resulting content then you should send feedback to Google, as expected

With those caveats out of the way I hope you have fun interacting with Nona AI. And check back here for project updates. Enjoy!

### Technologies

I've made Nona AI using a combination of technologies:
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Vite](https://vitejs.dev/guide)
- [Google Fonts](https://fonts.google.com)
- Original design elements (in CSS and SVG)

### Screenshots of a prompt sequence

![nona-ai-screenshot-start](https://github.com/alecthibodeau/image-library/blob/main/assets/nona-ai/nona-ai-screenshot-start.jpg?raw=true)

![nona-ai-screenshot-text](https://github.com/alecthibodeau/image-library/blob/main/assets/nona-ai/nona-ai-screenshot-text.jpg?raw=true)

![nona-ai-screenshot-prompt](https://github.com/alecthibodeau/image-library/blob/main/assets/nona-ai/nona-ai-screenshot-prompt.jpg?raw=true)

![nona-ai-screenshot-result](https://github.com/alecthibodeau/image-library/blob/main/assets/nona-ai/nona-ai-screenshot-result.jpg?raw=true)

### The user experience

I want the user experience (UX) of interacting with Nona AI's interface to be easy. As with all my projects digital accessibility is of the highest importance: Nona AI has semantic HTML tags, tabbable elements and responsive web design. All text passes [WCAG Level AAA](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html) for color contrast.

I've added other features to keep the user engaged and in control:
  - The text input expands vertically as needed to fit the user's prompt length
  - The user can cancel a prompt action with the stop button
  - The user can press the arrow up key to load their last prompt
  - The thread of prompts and results stays scrolled to the bottom until the user manually scrolls, breaking the scrolled-down alignment

### When to use

From the description at Google's [Built-in AI](https://developer.chrome.com/docs/ai/built-in)&hellip;

*When to use built-in AI*
  - *AI-enhanced content consumption: Including summarization, translation, answering questions about some content, categorization, and characterizing.*
  - *AI-supported content creation: Such as writing assistance, proofreading, grammar correction, and rephrasing.*

### Try it offline

Once you're getting results try turning off your Wi-Fi signal or otherwise disconnecting from the internet. You'll find you can ***still*** send prompts and receive results with the Nona AI interface. Why is that? It's because the Gemini Nano LLM is integrated directly into the Chrome browser, avoiding the need for an internet connection.

### Suggested prompts

Not sure where to start? Try any of these prompts to see what you get (avoid numerical digits):
- What's two plus two?
- What's red plus yellow?
- What are the states in New England?
- Who were the members of the Beatles?
- Write a paragraph about the sport of running.

### Future features

- Designing for mobile: If and when Gemini Nano becomes available for browsers on all major mobile devices I'll be able to fully test Nona AI's interface with a mobile-first approach. In anticipation of mobile development the interface is already responsive for smaller viewport widths. Though there may currently be unintended UI issues when viewing Nona AI on a mobile device &mdash; in addition to the prompt functionality likely not working.

- Themes: This initial version of Nona AI has a distinctive color palette to distinguish it from typically achromatic LLM interfaces. However, I see the benefits of neutrally colored design elements when users are seeking information on a wide range of topics. One of my goals for Nona AI is a Settings area where users can choose color themes: hue mode, light mode or dark mode.


###### Software and content Copyright (C) Alec Thibodeau. Copyright year is by commit date.
