import { ContentSection } from './Contents/ContentSection'
import { Highlights } from './Contents/Highlights'
// import { Highlights } from './Contents/HighLights'

const LandingPage = () => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] overflow-auto">
        <ContentSection/>
        <Highlights/>
      </div>

    </main>
  )
}

export default LandingPage