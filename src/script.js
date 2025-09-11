document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Element References ---
  const taskInput = document.getElementById("task");
  const contextInput = document.getElementById("context");
  const referencesInput = document.getElementById("references");
  const tagsContainer = document.getElementById("tags-container");
  const generateBtn = document.getElementById("generate-btn");
  const btnText = document.getElementById("btn-text");
  const btnLoader = document.getElementById("btn-loader");
  const outputSection = document.getElementById("output-section");
  const outputPrompt = document.getElementById("output-prompt");
  const copyBtn = document.getElementById("copy-btn");
  const copyFeedback = document.getElementById("copy-feedback");
  const loader = document.getElementById("loader");

  let keywordFetchController = null;

  // --- Auto-Suggestion Placeholders ---
  const taskPlaceholders = [
    "e.g., Generate a short story...",
    "e.g., Write a Python script that...",
    "e.g., Create a marketing campaign slogan for...",
    "e.g., Explain the concept of quantum computing...",
    "e.g., Draft a professional email to...",
  ];
  const contextPlaceholders = [
    "e.g., The story should be for young adults...",
    "e.g., The target audience is beginner programmers...",
    "e.g., The tone should be witty and humorous...",
    "e.g., Explain it in simple terms for a 10th grader...",
    "e.g., The email needs to be formal and concise...",
  ];
  const referencePlaceholders = [
    "e.g., Write in a style similar to...",
    "e.g., Emulate the structure of this article: [link]",
    "e.g., Use a tone like the Wendy's Twitter account...",
    "e.g., Base the explanation on Richard Feynman's style...",
  ];

  // Function to cycle placeholders
  const cyclePlaceholders = (element, placeholders) => {
    let currentIndex = 0;
    setInterval(() => {
      if (document.activeElement !== element && element.value.trim() === "") {
        element.placeholder = placeholders[currentIndex];
        // When currentIndex reaches the end of the placeholders array, it loops back to the beginning (index 0). This creates a continuous cycle of placeholders.
        currentIndex = (currentIndex + 1) % placeholders.length;
      }
    }, 3000);
  };

  cyclePlaceholders(taskInput, taskPlaceholders);
  cyclePlaceholders(contextInput, contextPlaceholders);
  cyclePlaceholders(referencesInput, referencePlaceholders);

  // --- Debounce Function ---
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // --- API Call to Gemini for Keywords ---
  const fetchKeywords = async () => {
    const task = taskInput.value.trim();
    const context = contextInput.value.trim();

    if (task.length < 10 && context.length < 10) {
      tagsContainer.innerHTML =
        '<p class="text-gray-500 text-sm">Start typing to generate keywords.</p>';
      return;
    }

    loader.classList.remove("hidden");
    loader.classList.add("flex");
    tagsContainer.innerHTML = "";

    if (keywordFetchController) keywordFetchController.abort();
    keywordFetchController = new AbortController();

    const userPrompt = `Based on the following prompt details, generate a JSON array of 15 relevant, single-word or two-word keywords or tags. Task: "${task}". Context: "${context}".`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: { type: "ARRAY", items: { type: "STRING" } },
      },
    };

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Handled by environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: keywordFetchController.signal,
      });

      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);

      const result = await response.json();

      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        const keywords = JSON.parse(result.candidates[0].content.parts[0].text);
        displayKeywords(keywords);
      } else {
        throw new Error("Invalid response structure from API.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching keywords:", error);
        tagsContainer.innerHTML =
          '<p class="text-red-400 text-sm">Could not generate keywords.</p>';
      }
    } finally {
      loader.classList.add("hidden");
    }
  };

  // --- Display Keywords as Pills ---
  const displayKeywords = (keywords) => {
    tagsContainer.innerHTML = "";
    if (!keywords || keywords.length === 0) {
      tagsContainer.innerHTML =
        '<p class="text-gray-500 text-sm">No keywords generated. Try adding more detail.</p>';
      return;
    }
    keywords.forEach((keyword) => {
      const tagEl = document.createElement("button");
      tagEl.className =
        "px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500";
      tagEl.textContent = keyword;
      tagEl.dataset.selected = "false";
      tagsContainer.appendChild(tagEl);
    });
  };

  // --- Generate Final Prompt using AI ---
  const generateFinalPrompt = async (task, context, references, keywords) => {
    const metaPrompt = `
          As an expert prompt engineer, your task is to synthesize the following structured inputs into a single, cohesive, and highly effective prompt for a generative AI model. 
          The final prompt should be written in natural, conversational language, seamlessly combining all the details into a clear and direct set of instructions. 
          Do not use markdown, headings like "### TASK ###", or any other structural formatting. The output should be a single block of text ready to be used.

          Here are the components to synthesize:
          - **Primary Task:** ${task}
          - **Detailed Context:** ${context || "No specific context provided."}
          - **Style & References:** ${
            references || "No specific style references provided."
          }
          - **Key Keywords to incorporate:** ${keywords.join(", ") || "None"}

          Now, generate the final, user-ready prompt:`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: metaPrompt }] }],
    };

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Handled by environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`API request failed: ${response.status}`);
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response from prompt generation API.");
      }
    } catch (error) {
      console.error("Error generating final prompt:", error);
      return "Sorry, there was an error generating the prompt. Please try again.";
    }
  };

  // --- Event Handlers ---
  const debouncedFetchKeywords = debounce(fetchKeywords, 1000);

  [contextInput, referencesInput].forEach((input) => {
    input.addEventListener("keyup", debouncedFetchKeywords);
  });

  // Handle task input separately for button state and keyword fetching
  taskInput.addEventListener("input", () => {
    if (taskInput.value.trim().length > 0) {
      generateBtn.disabled = false;
    } else {
      generateBtn.disabled = true;
    }
    debouncedFetchKeywords();
  });

  tagsContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const isSelected = e.target.dataset.selected === "true";
      e.target.dataset.selected = !isSelected;
      e.target.classList.toggle("bg-blue-600", !isSelected);
      e.target.classList.toggle("text-white", !isSelected);
      e.target.classList.toggle("bg-gray-700", isSelected);
      e.target.classList.toggle("text-gray-300", isSelected);
    }
  });

  generateBtn.addEventListener("click", async () => {
    const task = taskInput.value.trim();
    // This check is redundant now due to the disabled state, but good for safety
    if (!task) return;

    btnText.classList.add("hidden");
    btnLoader.classList.remove("hidden");
    generateBtn.disabled = true;

    const context = contextInput.value.trim();
    const references = referencesInput.value.trim();
    const selectedTags = Array.from(
      tagsContainer.querySelectorAll('button[data-selected="true"]')
    ).map((tag) => tag.textContent);

    const finalPrompt = await generateFinalPrompt(
      task,
      context,
      references,
      selectedTags
    );

    outputPrompt.value = finalPrompt.trim();
    outputSection.classList.remove("hidden");
    outputPrompt.style.height = "auto";
    outputPrompt.style.height = outputPrompt.scrollHeight + 5 + "px";

    btnText.classList.remove("hidden");
    btnLoader.classList.add("hidden");
    // Re-enable the button after generation is complete
    generateBtn.disabled = false;
  });

  copyBtn.addEventListener("click", () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(outputPrompt.value);
    } else {
      outputPrompt.select();
      document.execCommand("copy");
    }

    copyFeedback.textContent = "Copied to clipboard!";
    setTimeout(() => {
      copyFeedback.textContent = "";
    }, 2000);
  });

  // Initial state
  fetchKeywords();
});
