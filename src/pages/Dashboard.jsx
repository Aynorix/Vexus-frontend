import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import HeroSection from '../components/dashboard/HeroSection'
import MotivationQuote from '../components/dashboard/MotivationQuote'
import Greeting from '../components/dashboard/Greeting'
import StatsGrid from '../components/dashboard/StatsGrid'
import QuickActions from '../components/dashboard/QuickActions'
import TodoBoard from '../components/dashboard/TodoBoard'
import AnalyticsOverview from '../components/dashboard/AnalyticsOverview'
import RecommendationCard from '../components/dashboard/RecommendationCard'
import SocialLinks from '../components/dashboard/SocialLinks'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'

/* The dashboard answers "how am I doing?" — information, actions,
   progress and recommendations only. Navigation lives in the navbar. */
export default function Dashboard() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <HeroSection />
        <MotivationQuote />
        <Greeting />
        <StatsGrid />
        <QuickActions />
        <TodoBoard />
        <AnalyticsOverview />
        <RecommendationCard />
      </PageContainer>
      <footer className="foot">
        <SocialLinks />
        <p>
          <Icon name="bolt" size={14} /> VexusIQ · React + Vite frontend · prototype running on
          mock data
        </p>
        <p className="foot__dim">Build yourself, one action at a time.</p>
      </footer>
      <ToastStack />
    </>
  )
}
