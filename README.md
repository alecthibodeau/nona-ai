# Nona AI

## A user interface for Google Gemini Nano

Nona AI is a user interface I've made that connects your local machine to Google's new built-in AI model, Gemini Nano for Chrome. Type your prompts into Nona AI's text input and then receive unique responses &mdash; similar to other large language model (LLM) interfaces like ChatGPT and Google Gemini.

I made this repository in React and TypeScript to run on a Vite local development server. To interact with Nona AI you will need to clone the repository to your local machine then run it with Vite.

Currently Gemini Nano is a built-in feature of Google's Chrome Dev browser. As of this writing you will need to install Chrome Dev on your machine to use Nona AI for connecting with Gemini Nano.

After setting up everything you'll have the option to run this project with no internet signal, completely offline! Such is the built-in nature of the AI model.

Before starting please review Google's [Built-in AI](https://developer.chrome.com/docs/ai/built-in) description, particularly the text at bottom reading "When to use built-in AI." Then take the following steps to set up your machine for locally running Nona AI in Chrome Dev.

### Steps to get Nona AI running on your machine…

1) Install or update [Node.js](https://nodejs.org/en/download/package-manager).
2) Install [Chrome Dev browser](https://www.google.com/chrome/dev).
3) Enable Chrome Dev to connect to Gemini Nano: Follow the steps [here](https://ai-sdk-chrome-ai.vercel.app), specifically the three numbered ones in "Necessary Experimental Flags."
4) Clone this repository to your machine
5) On your machine navigate to where'd you've cloned this repository.
6) Install dependencies from your local command line interface (CLI) by running the command `npm install`
7) Run Nona AI from your local CLI by running the command `npm run dev`
8) In your ***Chrome Dev*** browser (not regular Chrome or any other browser) navigate to `localhost:5173` or whichever port Vite indicates.
9) Enjoy! (And check back here for project updates.)

###### Software and content Copyright (C) Alec Thibodeau. Copyright year is by commit date.
