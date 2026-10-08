import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import CommunityPanel from '../components/CommunityPanel'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'

export default function Community() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="phead">
          <span className="tag tag--mint">
            <Icon name="users" size={13} /> Spaces
          </span>
          <h1>Community</h1>
          <p>Find your circle — every space is a room inside your growth journey.</p>
        </header>
        <CommunityPanel />
      </PageContainer>
      <ToastStack />
    </>
  )
}
