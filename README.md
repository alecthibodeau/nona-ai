# Nona AI

## A registration-free user interface for Google Gemini Nano

Are you curious about artificial intelligence (AI)? Are you looking to experiment with AI but don't want to register for yet another online account?

Nona AI is a user interface (UI) I've made that connects to Google's new built-in AI model: Gemini Nano for Chrome. Type your prompts into Nona AI's text input, then get text results back from Gemini Nano &mdash; similar to other browser-based large language model (LLM) interfaces like Google Gemini and ChatGPT.

However, **unlike** most other LLM interfaces Nona AI doesn't require any kind of account registration or sign up process. There's no need to provide your email address, name or any other personal information. Just use the correct web browser and properly configure it with a few quick steps.

Currently Gemini Nano is an experimental, built-in feature of Google's Chrome Dev browser. As of this writing you must have Chrome Dev installed on your computer to use Nona AI for connecting with Gemini Nano. But that's all you need to install. Once you've configured the browser you're ready to go.

After configuring Chrome Dev you'll have the option to use Nona AI with no internet signal, completely offline! Such is the built-in nature of the AI model.

### How to configure your browser for Nona AI

- Install [Chrome Dev browser](https://www.google.com/chrome/dev) on your computer.

- Open Chrome Dev browser.

- Configure Chrome Dev browser to connect with Gemini Nano by following [these quick steps](https://ai-sdk-chrome-ai.vercel.app), specifically the three numbered steps in the bottom section under **Necessary Experimental Flags**&hellip;

![nona-ai-chrome-dev-necessary-experimental-flags](https://github.com/alecthibodeau/resource-library/blob/main/assets/nona-ai/chrome-dev-necessary-experimental-flags.jpg?raw=true)

### Using Nona AI

- In your ***Chrome Dev*** browser &mdash; ***not*** regular Chrome or any other browser &mdash; navigate to [Nona AI](https://alect.me/nona-ai).  Note: If you use a different browser than Chrome Dev you may see the Nona AI interface as expected and even be able to submit prompts&hellip; but you won't get results. You'll simply wait.

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

![nona-ai-screenshot-start](https://github.com/alecthibodeau/resource-library/blob/main/assets/nona-ai/nona-ai-screenshot-start.jpg?raw=true)

![nona-ai-screenshot-text](https://github.com/alecthibodeau/resource-library/blob/main/assets/nona-ai/nona-ai-screenshot-text.jpg?raw=true)

![nona-ai-screenshot-prompt](https://github.com/alecthibodeau/resource-library/blob/main/assets/nona-ai/nona-ai-screenshot-prompt.jpg?raw=true)

![nona-ai-screenshot-result](https://github.com/alecthibodeau/resource-library/blob/main/assets/nona-ai/nona-ai-screenshot-result.jpg?raw=true)

### The user experience

I want the user experience (UX) of interacting with Nona AI's interface to be easy. As with all my projects digital accessibility is of the highest importance: Nona AI has semantic HTML tags, tabbable elements and responsive web design. All text passes [WCAG Level AAA](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html) for color contrast.

I've added other features to keep the user engaged and in control:
  - The text input expands vertically as needed to fit the user's prompt length
  - The user can cancel a prompt action with the stop button
  - The user can press the arrow up key to load their last prompt
  - The thread of prompts and results stays scrolled to the bottom until the user manually scrolls, breaking the scrolled-down alignment

### When to use

From Google's Built-in AI description&hellip;

*When to use built-in AI*
  - *AI-enhanced content consumption: Including summarization, translation, answering questions about some content, categorization, and characterizing.*
  - *AI-supported content creation: Such as writing assistance, proofreading, grammar correction, and rephrasing.*

### Try it offline

Once you're getting results try turning off your Wi-Fi signal or otherwise disconnecting from the internet. You'll find you can ***still*** send prompts and receive results with the Nona AI interface. Why is that? It's because the Gemini Nano LLM is integrated directly into the Chrome Dev browser, avoiding the need for an internet connection.

### Suggested prompts

Not sure where to start? Try any of these prompts to see what you get:
- What's 2 + 2?
- What's red plus yellow?
- What are the states in New England?
- Who were the members of the Beatles?
- Write a paragraph about the sport of running.

### Future features

- Designing for mobile: Because Chrome Dev is currently the only browser that can interact with Gemini Nano I've prioritized responsive design for desktop viewport widths &mdash; while also being mindful of smaller ones. If and when Gemini Nano becomes available for mobile browsers I'll be able to fully test Nona AI's interface with a mobile-first approach. Until then there may be unintended UI issues when viewing Nona AI on a mobile device, in addition to the prompt functionality not working.

- Themes: This initial version of Nona AI has a distinctive color palette to distinguish it from typically achromatic LLM interfaces. However, I see the benefits of neutrally colored design elements when users are seeking information on a wide range of topics. One of my goals for Nona AI is a Settings area where users can choose color themes: hue mode, light mode or dark mode.


###### Software and content Copyright (C) Alec Thibodeau. Copyright year is by commit date.
