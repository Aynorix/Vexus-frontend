import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import HobbiesPanel from '../components/HobbiesPanel'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'

export default function Hobbies() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="phead">
          <span className="tag tag--pink">
            <Icon name="spark" size={13} /> Off the clock
          </span>
          <h1>Hobbies</h1>
          <p>Everything you track outside of work and study, in one catalogue.</p>
        </header>
        <HobbiesPanel />
      </PageContainer>
      <ToastStack />
    </>
  )
}
