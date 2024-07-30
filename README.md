# Nona AI

## A custom user interface for Google Gemini Nano

Nona AI is a user interface I've made that connects to Google's new built-in AI model, Gemini Nano for Chrome. Type your prompts into Nona AI's text input, then get results back from Gemini Nano &mdash; similar to other browser-based large language model (LLM) interfaces like Google Gemini and ChatGPT.

Currently Gemini Nano is an experimental built-in feature of Google's Chrome Dev browser. As of this writing you ***must*** have Chrome Dev installed on your computer to use Nona AI for connecting with Gemini Nano.

After setting up everything you'll have the option to run this project from Chrome Dev with no internet signal, completely offline! Such is the built-in nature of the AI model.

### Steps to get Nona AI running

1) Install [Chrome Dev browser](https://www.google.com/chrome/dev) on your computer.
2) Open Chrome Dev browser.
3) Enable Chrome Dev browser to connect to Gemini Nano: Follow [these quick steps](https://ai-sdk-chrome-ai.vercel.app), specifically the three numbered steps in "**Necessary Experimental Flags**" for setting the needed flags&hellip;

    - Step 1: chrome://flags/#prompt-api-for-gemini-nano
      - Select 'Enabled

    - Step 2: chrome://flags/#optimization-guide-on-device-model
      - Select 'Enabled BypassPrefRequirement'

    - Step 3: chrome://components
      - Click 'Check for Update' on Optimization Guide On Device Model to download the model. If you don't see Optimization Guide, ensure you have set the flags correctly above, relaunch your browser, and refresh the page.

4) In your ***Chrome Dev*** browser (***not*** regular Chrome or any other browser) navigate to [https://alect.me/nona-ai](https://alect.me/nona-ai).  Note: If you use a different browser than Chrome Dev you'll be able to see the Nona AI interface as expected and even submit a prompt&hellip; but you won't get a result.

5) Make a prompt in the input: Start with something simple like "What's 2 + 2?" If you get a corresponding result you'll know Nona AI is working as expected.
6) Be patient and forewarned: As Google's [Built-in AI](https://developer.chrome.com/docs/ai/built-in) description states&hellip;

    *"**Important**: This implementation of built-in AI with Gemini Nano is an experiment and will change as we test and address feedback."*

    The experimental reality of Gemini Nano means you may encounter occasional performance issues &mdash; like longer than expected wait times after your prompt submission &mdash; or strange/nonsensical wording in the resulting text. While I built Nona AI from scratch for use as a front end, I have no control over the Gemini Nano back end. I can't alter its performance or claim authorship of the content in its responses.
    - If the wait time is too long hit the stop button to cancel your prompt
    - If you have thoughts on the results text send feedback to Google

7) Enjoy! With those caveats out of the way I hope you have fun interacting with Nona AI. (And check back here for project updates.)

### The user experience

I want the Nona AI interface to feel easy to use. As with all my projects digital accessibility is of the highest importance: Nona AI has semantic HTML tags, tabbable elements, mobile-first responsiveness and AAA color contrast for all text.

I've added other features to keep the user engaged and in control&hellip;
  - The text input expands vertically as needed to fit the user's prompt
  - The user can cancel a prompt action with the stop button
  - The user can press the arrow up key to load their last prompt
  - The thread of prompts and results stays scrolled to the bottom until the user manually scrolls, breaking the scrolled-down alignment

### When to use

From Google's Built-in AI description&hellip;

*"When to use built-in AI*

  - *AI-enhanced content consumption: Including summarization, translation, answering questions about some content, categorization, and characterizing.*

  - *AI-supported content creation: Such as writing assistance, proofreading, grammar correction, and rephrasing."*

### Try it offline

Once you're getting results try turning off your wifi signal (or otherwise disconnecting from the internet). You'll find you can ***still*** send prompts and receive results with the Nona AI interface. Why is that? It's because the Gemini Nano LLM is integrated directly into the Chrome Dev browser, avoiding the need for an internet connection.

### Suggested prompts

Not sure where to start? Try any of these prompts to see what you get:
- What's 2 + 2?
- What's red plus yellow?
- What are the states in New England?
- Who were the members of the Beatles?
- Write a paragraph about the sport of running.


###### Software and content Copyright (C) Alec Thibodeau. Copyright year is by commit date.
