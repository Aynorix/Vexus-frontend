import TopBar from '../components/TopBar'
import Hero from '../components/Hero'
import FeatureHub from '../components/FeatureHub'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'

export default function Dashboard() {
  return (
    <>
      <TopBar />
      <main className="page">
        <Hero />
        <FeatureHub />
      </main>
      <footer className="foot">
        <p>
          <Icon name="bolt" size={14} /> VexusIQ · React + Vite frontend · dashboard running on
          mock data
        </p>
        <p className="foot__dim">
          Sub-category pages route to placeholders until the API Gateway and services are wired.
        </p>
      </footer>
      <ToastStack />
    </>
  )
}