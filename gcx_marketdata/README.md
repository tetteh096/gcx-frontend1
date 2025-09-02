# GCX Market Data Platform

A professional market data platform for Ghana Commodity Exchange (GCX) members and traders, built with Next.js, React, TypeScript, and TailwindCSS.

## 🚀 Features

### Core Functionality
- **Real-time Market Data**: Live commodity prices, volumes, and trading activity
- **Historical Analytics**: Comprehensive historical data for backtesting and trend analysis
- **Advanced Charting**: TradingView integration with technical analysis tools
- **Subscription Management**: Role-based access control with different subscription tiers
- **Responsive Design**: Mobile-first design for all devices

### User Types & Access Levels
1. **Free Users**: 15-minute delayed data, basic commodity information
2. **Basic Plan**: 5-minute delayed data, 30-day historical data
3. **Professional Plan**: Real-time data, 5-year historical data, API access
4. **Enterprise Plan**: Full access, white-label solutions, custom integrations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Tremor** - React components for dashboards
- **Recharts** - Charting library
- **TradingView Widget** - Professional trading charts

### Backend (Planned)
- **Go (Golang)** - High-performance backend
- **PostgreSQL** - Primary database
- **Redis** - Caching and real-time data
- **TimescaleDB** - Time-series data extension

### Authentication & Payments
- **NextAuth.js** - Authentication framework
- **Stripe** - Payment processing
- **JWT** - Token-based authentication

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Main dashboard page
│   ├── market-data/       # Market data pages
│   │   ├── prices/        # Live commodity prices
│   │   ├── history/       # Historical data
│   │   ├── overview/      # Market overview
│   │   └── page.tsx       # Main market data page
│   ├── trading/           # Trading pages
│   │   ├── portfolio/     # Trading portfolio
│   │   └── orders/        # Order management
│   ├── index/             # GCX Index pages
│   │   └── regional-comparison/ # Regional comparisons
│   ├── alerts/            # Alerts and notifications
│   ├── pricing/           # Subscription plans
│   ├── auth/              # Authentication pages
│   ├── layout.tsx         # Root layout with navbar
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   │   ├── Sidebar.tsx    # Main navigation sidebar
│   │   ├── Navbar.tsx     # Top navigation
│   │   └── LandingNavbar.tsx # Landing page navbar
│   ├── auth/              # Authentication components
│   ├── market-data/       # Market data components
│   │   ├── PriceTable.tsx         # Professional price table
│   │   ├── ProfessionalChart.tsx  # Advanced charting
│   │   ├── MarketSummary.tsx      # Market metrics cards
│   │   ├── TradingChart.tsx       # Trading charts
│   │   ├── MarketPerformanceChart.tsx # Performance charts
│   │   └── RegionalVolumeChart.tsx # Regional volume charts
│   └── ui/                # UI components
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gcx_marketdata
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Market Data Components

### PriceTable
- Professional commodity price table
- Real-time price updates with bid/ask spreads
- Volume and timestamp information
- Regional and grade information display

### ProfessionalChart
- Advanced charting with multiple chart types
- Line, area, and bar chart support
- Customizable series and colors
- Professional tooltips and legends

### MarketSummary
- Key market metrics dashboard
- Trading volume, market cap, active traders
- Change indicators with visual feedback
- Responsive grid layout

### TradingChart
- Interactive trading charts
- Real-time data visualization
- Multiple timeframes and indicators
- Professional trading interface

## 🔐 Authentication & Subscriptions

### User Roles
- **Anonymous**: Limited access to public data
- **Registered**: Basic market data access
- **Subscriber**: Full access based on plan
- **Admin**: Platform management access

### Subscription Plans
- **Free**: ₵0/month - Basic access
- **Basic**: ₵99/month - Essential features
- **Professional**: ₵299/month - Advanced features
- **Enterprise**: Custom pricing - Full access

## 🌐 API Integration

### Trading System API
- Real-time market data feed
- Historical data retrieval
- User authentication and authorization
- Subscription management

### Data Sources
- GCX trading floor data
- Market feeds and aggregators
- Historical databases
- External market data providers

## 🎨 UI/UX Features

### Design Principles
- Clean, professional financial interface
- Mobile-first responsive design
- Accessibility compliance
- Dark/light theme support (planned)

### Component Library
- Tremor for dashboard components
- Custom chart components
- Responsive navigation
- Interactive data tables

## 🔧 Development

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks (planned)

### Testing
- Jest for unit testing
- React Testing Library
- E2E testing with Playwright (planned)

### Performance
- Next.js optimization
- Image optimization
- Code splitting
- Lazy loading

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_TRADINGVIEW_SYMBOL=GCX:MAIZE
STRIPE_SECRET_KEY=your-stripe-key
NEXTAUTH_SECRET=your-auth-secret
```

### Deployment Platforms
- Vercel (recommended)
- AWS Amplify
- Netlify
- Docker containers

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and structure
- [x] Basic components and pages
- [x] Landing page and navigation
- [x] Dashboard layout

### Phase 2: Core Features 🚧
- [ ] User authentication system
- [ ] Subscription management
- [ ] Real-time data integration
- [ ] Historical data storage

### Phase 3: Advanced Features 📋
- [ ] API documentation
- [ ] Mobile app (PWA)
- [ ] Advanced analytics
- [ ] Custom alerts and notifications

### Phase 4: Enterprise Features 📋
- [ ] White-label solutions
- [ ] Custom integrations
- [ ] Advanced reporting
- [ ] Multi-tenant support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@gcx.com.gh
- Documentation: [docs.gcx.com.gh](https://docs.gcx.com.gh)
- Issues: [GitHub Issues](https://github.com/gcx/market-data-platform/issues)

## 🙏 Acknowledgments

- Ghana Commodity Exchange (GCX) team
- Next.js and React communities
- TradingView for charting tools
- All contributors and supporters

---

**Built with ❤️ for the Ghana Commodity Exchange**
