import Navbar from '../components/layout/Navbar'
import PageContainer from '../components/layout/PageContainer'
import AcademicsPanel from '../components/AcademicsPanel'
import ToastStack from '../components/ToastStack'
import Icon from '../components/Icon'

export default function Academics() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="phead">
          <span className="tag tag--cyan">
            <Icon name="cap" size={13} /> Study
          </span>
          <h1>Academics</h1>
          <p>Courses, assignments and progress — the study side of your growth system.</p>
        </header>
        <AcademicsPanel />
      </PageContainer>
      <ToastStack />
    </>
  )
}
