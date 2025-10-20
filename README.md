# Calc1 - One Site. All Calculators.

A comprehensive Next.js platform with over 100 calculators, supporting multiple languages and categories.

## 🌟 Features

-   **100+ Calculators** across 10 categories
-   **Multi-language Support** (Russian, English, German, Spanish)
-   **SEO Optimized** with clean URLs and meta tags
-   **API Endpoints** for external integration
-   **Responsive Design** with Tailwind CSS
-   **TypeScript** for type safety
-   **Dynamic Imports** for optimal performance

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd calc1
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── calc/          # Calculator pages
│   │   ├── finance/       # Category pages
│   │   └── page.tsx       # Homepage
│   └── api/               # API endpoints
│       └── calc/          # Calculator APIs
├── components/            # React components
│   ├── calculators/       # Calculator components
│   ├── header.tsx         # Site header
│   └── category-card.tsx  # Category cards
├── lib/                   # Utility libraries
│   └── calculators/       # Calculator logic
└── messages/              # Translation files
    ├── ru.json           # Russian translations
    ├── en.json           # English translations
    ├── de.json           # German translations
    └── es.json           # Spanish translations
```

## 🌍 Internationalization

The site supports 4 languages with clean URLs:

-   **Russian**: `/ru/calc/ves-bumagi`
-   **English**: `/en/calc/paper-weight`
-   **German**: `/de/calc/papier-gewicht`
-   **Spanish**: `/es/calc/peso-papel`

### Adding New Languages

1. Add locale to `src/i18n.ts`
2. Create translation file in `messages/`
3. Update `src/middleware.ts`

## 🧮 Calculator Categories

### 1. Financial Calculators (`/finance`)

-   Credit Loan Calculator
-   Deposit Calculator
-   Mortgage Calculator
-   Currency Converter
-   Tax Calculator
-   Investment Calculator
-   Retirement Calculator
-   Compound Interest

### 2. Mathematical Calculators (`/math`)

-   Basic Calculator
-   Fraction Calculator
-   Percentage Calculator
-   Area Calculator
-   Volume Calculator
-   Power & Root Calculator
-   Equation Solver
-   Statistics Calculator
-   Unit Converter

### 3. Life Calculators (`/life`)

-   Calorie Calculator
-   BMI Calculator
-   Nutrition Calculator
-   Pregnancy Calculator
-   Blood Alcohol Calculator
-   Water Intake Calculator
-   Sleep Calculator
-   Baby Growth Calculator

### 4. Construction Calculators (`/construction`)

-   Wallpaper Calculator
-   Paint Calculator
-   Flooring Calculator
-   Concrete Calculator
-   Roof Calculator
-   Brick Calculator
-   Foundation Calculator
-   Heating Calculator

### 5. Auto Calculators (`/auto`)

-   Fuel Consumption Calculator
-   Distance Calculator
-   Vehicle Tax Calculator
-   Lease Calculator
-   Insurance Calculator
-   Depreciation Calculator
-   Speed Calculator
-   Unit Conversion

### 6. Time & Date (`/time`)

-   Days Between Dates
-   Add Time Calculator
-   Age Calculator
-   Deadline Calculator
-   Calendar
-   Timer
-   Countdown
-   World Time

### 7. Health & Medical (`/health`)

-   BMI Calculator
-   Heart Rate Calculator
-   Blood Pressure Calculator
-   Ovulation Calculator
-   Vitamin Calculator
-   Stress Calculator
-   Dosage Calculator

### 8. Education & Science (`/science`)

-   Physics Formulas
-   Chemistry Calculator
-   Geometry Calculator
-   Algebra Calculator
-   Statistics Calculator
-   Astronomy Calculator
-   Electronics Calculator
-   Optics Calculator

### 9. Online Converters (`/converter`)

-   Length Converter
-   Weight Converter
-   Temperature Converter
-   Speed Converter
-   Pressure Converter
-   Volume Converter
-   Energy Converter
-   Data Converter

### 10. Entertainment (`/fun`)

-   Love Compatibility
-   Nickname Generator
-   Random Number Generator
-   Lottery Generator
-   Password Generator
-   Dice Roller
-   Coin Flip
-   Zodiac Calculator

## 🔧 API Usage

### Paper Weight Calculator

```bash
POST /api/calc/paper-weight
Content-Type: application/json

{
  "sheets": 100,
  "density": 80,
  "format": "A4"
}
```

### BMI Calculator

```bash
POST /api/calc/bmi
Content-Type: application/json

{
  "weight": 70,
  "height": 175
}
```

### Credit Loan Calculator

```bash
POST /api/calc/credit-loan
Content-Type: application/json

{
  "principal": 100000,
  "interestRate": 12,
  "termMonths": 60,
  "paymentType": "annuity"
}
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a custom design system:

-   **Primary Color**: Blue (#3B82F6)
-   **Typography**: Inter font family
-   **Components**: Custom components with hover effects
-   **Responsive**: Mobile-first design approach

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push

### Other Platforms

```bash
npm run build
npm start
```

## 🔍 SEO Features

-   **Clean URLs**: `/ru/calc/ves-bumagi`
-   **Meta Tags**: Dynamic titles and descriptions
-   **Structured Data**: Calculator-specific metadata
-   **Sitemap**: Auto-generated sitemap
-   **Performance**: Optimized loading with dynamic imports

## 🛠️ Development

### Adding New Calculators

1. **Create calculator logic** in `src/lib/calculators/`
2. **Create React component** in `src/components/calculators/`
3. **Add page route** in `src/app/[locale]/calc/`
4. **Create API endpoint** in `src/app/api/calc/`
5. **Add translations** in `messages/` files

### Example Calculator Structure

```typescript
// src/lib/calculators/my-calculator.ts
export interface MyCalculatorInput {
	value1: number;
	value2: number;
}

export interface MyCalculatorResult {
	result: number;
}

export function calculateMyCalculator(
	input: MyCalculatorInput
): MyCalculatorResult {
	// Calculation logic
	return { result: input.value1 + input.value2 };
}
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Calc1** - One site. All calculators. 🧮
















