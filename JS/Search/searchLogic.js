import { keywords } from './searchKeywords.js';

export class SearchHandler {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.suggestionsContainer = null;
        this.initializeSearch();
    }

    initializeSearch() {
        this.createSuggestionsContainer();
        this.setupEventListeners();
        this.addStyles();
    }

    createSuggestionsContainer() {
        this.suggestionsContainer = document.createElement('div');
        this.suggestionsContainer.className = 'suggestions-container';
        this.searchInput.parentNode.insertBefore(
            this.suggestionsContainer, 
            this.searchInput.nextSibling
        );
    }

    filterKeywords(searchTerm) {
        if (!searchTerm) return [];
        searchTerm = searchTerm.toLowerCase();
        return keywords.filter(keyword => 
            keyword.text.toLowerCase().includes(searchTerm)
        );
    }

    createSuggestionsList(filteredKeywords) {
        const suggestionsList = document.createElement('div');
        suggestionsList.className = 'suggestions-list';
        
        filteredKeywords.forEach(keyword => {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = keyword.text;
            
            suggestion.addEventListener('click', () => {
                window.open(keyword.url, '_blank');
            });
            
            suggestionsList.appendChild(suggestion);
        });
        
        return suggestionsList;
    }

    updateSuggestions(searchTerm) {
        const filteredKeywords = this.filterKeywords(searchTerm);
        this.suggestionsContainer.innerHTML = '';
        
        if (filteredKeywords.length > 0) {
            const suggestionsList = this.createSuggestionsList(filteredKeywords);
            this.suggestionsContainer.appendChild(suggestionsList);
        }
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', (e) => {
            this.updateSuggestions(e.target.value);
        });
    }

    addStyles() {
        const styles = `
            .suggestions-container {
                margin-top: 10px;
                max-height: 200px;
                overflow-y: auto;
            }

            .suggestion-item {
                padding: 8px 12px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .suggestion-item:hover {
                background-color: #f0f0f0;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}