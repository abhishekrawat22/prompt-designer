## 🚀One of the Top 6 Trailblazers for the Devfest New Delhi 2025.
## 🤖Among the Top AI Projects of the September Month in [Commudle](https://www.commudle.com/newsletters/53)

# PROMPTER - Craft Your Perfect AI Prompt

PROMPTER is a modern, responsive web application that helps users craft effective prompts for generative AI models. By breaking down the prompt creation process into structured inputs (Task, Context, References, and Keywords), PROMPTER assists users in generating clear, cohesive, and highly effective prompts.

## Features

*   **Structured Prompt Input**: Define your primary task, provide detailed context, and add relevant references.
*   **AI-Powered Keyword Generation**: Automatically suggests 15 relevant keywords based on your task and context using the Gemini API.
*   **Interactive Keyword Selection**: Easily select and incorporate the most appropriate keywords into your final prompt.
*   **Cohesive Prompt Synthesis**: Synthesizes all your inputs into a single, natural language prompt optimized for generative AI models.
*   **Copy to Clipboard**: One-click functionality to copy the generated prompt for immediate use.
*   **Responsive Design**: A clean and intuitive user interface built with Tailwind CSS.

## Technologies Used

*   **Frontend**:
    *   **HTML**
    *   **JavaScript**
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
    *   [Vite](https://vitejs.dev/): A fast frontend build tool.
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

```bash
npm run dev
# or
yarn dev
```

This will start the development server, usually at `http://localhost:5173`.

### 5. Build for Production

To create a production-ready build of the application:

```bash
npm run build
# or
yarn build
```

The build artifacts will be generated in the `dist` directory.

## Deployment

The `build` command creates a `dist` directory with all the necessary files for deployment. You can deploy this directory to any static site hosting service (e.g., Appwrite, Netlify, Vercel, GitHub Pages).

## Project Structure

```
.
├── assets/
│   └── ... (favicon related assets)
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
