# Infinite Giphy
![Application preview](/preview.gif)

## Setup
### Development server
Please install [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) before moving on.

1. Copy `.env.example` into `.env` and update `GIFPHY_API_KEY` with your Gifphy api key
2. Install node with `nvm install`
3. Install dependencies with `npm install`
4. Setup server with `npm run dev`

### Testing
- `npm run test:browser`: Runs browser test 
- `npm run test`: Runs unit test

## Folder structure
```
.
├── __mocks__         # Mocks setup for parsing stylesheets in unit test
├── __tests__         # Unit test
├── components        # React components
├── cypress           # Browser test
├── libs              # Customer libraries for shared logic
├── pages             # SSR pages
├── public            # Static assets
└── styles            # Stylesheets
```

## Tooling 
### Environment setup
- dotenv - Environment variable configuration
- Next.js - Integrated React setup for getting an APP running asap
- yarn - Package dependency manager

### JavaScript Libraries
- axios - Handles request to fetch GIFs
- lodash - Handles debounce for GIFs filter
- React

### Testing
- Cypress - Browser testing
- Enzyme - Testing utility for React
- Eslint - JavaScript linter
- Jest - Unit testing
