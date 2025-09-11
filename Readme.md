# PROMPTER - Craft Your Perfect AI Prompt

PROMPTER is a modern, responsive web application that helps users craft effective prompts for generative AI models. By breaking down the prompt creation process into structured inputs (Task, Context, References, and Keywords), PROMPTER assists users in generating clear, cohesive, and highly effective prompts.

## Features

*   **Structured Prompt Input**: Define your primary task, provide detailed context, and add relevant references.
*   **AI-Powered Keyword Generation**: Automatically suggests 15 relevant keywords based on your task and context using the Gemini API.
*   **Interactive Keyword Selection**: Easily select and incorporate the most appropriate keywords into your final prompt.
*   **Cohesive Prompt Synthesis**: Synthesizes all your inputs into a single, natural language prompt optimized for generative AI models.
*   **Copy to Clipboard**: One-click functionality to copy the generated prompt for immediate use.
*   **Progressive Web App (PWA)**: Installable on your device for quick access and an app-like experience.
*   **Responsive Design**: A clean and intuitive user interface built with Tailwind CSS.

## Technologies Used

*   **Frontend**:
    *   **HTML**
    *   **JavaScript**
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
*   **API Integration**:
    *   [Google Gemini API](https://ai.google.dev/): Used for intelligent keyword generation and synthesizing final prompts.

## Setup and Installation

Follow these steps to set up and run PROMPTER locally:

### 1. Clone the repository

```bash
git clone <repository-url>
cd prompter-designer # Or whatever your project directory is named
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Gemini API Key

PROMPTER uses the Google Gemini API. You need to obtain an API key and configure it:

1.  Go to the [Google AI Studio](https://ai.google.dev/) and generate a new API key.
2.  Create a `.env` file in the root of your project.
3.  Add your Gemini API key to the `.env` file:

    ```
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
    Replace `YOUR_GEMINI_API_KEY` with your actual API key.

### 4. Run the Development Server

- Install ***Live Server*** extension in your IDE and then click on the **Go Live** option on the bottom right corner of the IDE.

This will start the development server.

## Project Structure

```
.
├── aseets/
│   └── ... (PWA and favicon related assets)
├── src/
│   ├── index.css
│   ├── script.js           # Main application functionality code
├── index.html
├── package.json
├── site.webmanifest
├── vite.config.ts
└── ...
```

## Contributing

Feel free to fork the repository, open issues, or submit pull requests.

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
