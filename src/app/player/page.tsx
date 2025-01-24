import { ArticleHeader } from '@/components/player/Content/ArticleHeader';
import { ArticleAuthor } from '@/components/player/Content/ArticleAuthor';
import { ArticleContent } from '@/components/player/Content/ArticleContent';
import { QuestionsList } from '@/components/player/Questions/QuestionsList';
import { SourceItem, SourceList } from '@/components/player/Sources/SourceList';
import { TableOfContents } from '@/components/player/Navigation/TableOfContents';
import { ChapterMeta } from '@/components/player/Content/ChapterMeta';
import { ChapterActions } from '@/components/player/Content/ChapterActions';

const mockQuestions = [
  { id: '1', text: 'Why is a smile important for first impressions?', answer: 'A smile can make a big difference in whether or not you win someone over.' },
  { id: '2', text: 'How can a fake smile be avoided?', answer: 'A fake smile can be avoided by being genuine and authentic in your interactions.' },
];

const mockSources: SourceItem[] = [
  {
    id: '1',
    title: 'Multiple Halo games development',
    source: 'BT',
    sourceNumber: 1,
    type: 'text' as const,
    content: 'Multiple Halo games are in development using Unreal Engine 5',
    sourceLogo: '/images/BT-logo.png'
  },
  {
    id: '2',
    title: '343 Industries Rebrands',
    source: 'BT',
    sourceNumber: 2,
    type: 'image' as const,
    image: '/images/tesla.png',
    sourceLogo: '/images/bt-logo.png'
  },
  {
    id: '3',
    title: 'Halo Development News',
    source: 'CBS',
    sourceNumber: 3,
    type: 'text' as const,
    content: 'New Halo games will be developed using Unreal Engine 5',
    sourceLogo: '/images/cbs-logo.png'
  },
  {
    id: '4',
    title: 'Gaming Industry Update',
    source: 'CNN',
    sourceNumber: 4,
    type: 'text' as const,
    content: 'Major changes in Halo development',
    sourceLogo: '/images/cnn-logo.png'
  },
  {
    id: '5',
    title: 'Additional Source',
    source: 'CNBC',
    sourceNumber: 5,
    type: 'text' as const,
    content: 'More information about Halo',
    sourceLogo: '/images/cnbc-logo.png'
  }
];

const sections = [
  {
    id: 'schrodingers-cat',
    title: "Schrödinger's Cat Quantum Breakthrough",
    level: 2
  },
  {
    id: 'antimony-atom',
    title: 'Antimony Atom Spin Qudit',
    level: 2
  },
  {
    id: 'error-resilience',
    title: 'Error Resilience Achievements',
    level: 2
  },
  {
    id: 'future-directions',
    title: 'Future Directions in Quantum',
    level: 2
  }
];

export default function PlayerPage() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Hero Image Container */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="w-full z-0 h-[400px] rounded-2xl overflow-hidden relative mt-4">
          <img 
            src="/images/cat.png" 
            alt="Quantum Cat Visualization" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6 max-w-4xl mt-4">
            <div>
            {/* First Chapter Content */}
            <ArticleHeader
              title="Schrödinger's Cat Quantum Breakthrough"
              subtitle="Introduction"
              id="schrodingers-cat"
            />
            
            {/* Author Info */}
            <ArticleAuthor 
              theme="REALITY IS NOT WHAT IT SEEMS"
              name="Leil Lowndes"
              avatar="/images/avatar.png"
              meta={{
                duration: "24 min",
                views: 792,
                likes: 5,
                rating: 4.2,
                ratingCount: 18
              }}
            />

            {/* Main Content */}
            <ArticleContent 
              content="Based on reports from Nature Physics, researchers at the University of New South Wales have achieved a significant breakthrough in quantum computing by creating a Schrödinger's cat state system that potentially solves a major problem in quantum error correction and computing reliability..."
            />

            {/* Sources List */}
            <SourceList items={mockSources} />
            </div>

            <div>
              {/* Second Chapter Content */}
              <ArticleHeader 
                id="antimony-atom"
                title="Antimony Atom Spin Qudit"
                subtitle="CHAPTER 1 OF 12"
              />

              <ChapterMeta 
                tags={['Qudit Spin']}
                relatedBooks={[
                  { title: 'Think Like a Rocket Scientist', href: '#' },
                  { title: 'Magic Worlds', href: '#' }
                ]}
                sourcesCount={16}
              />

              <ArticleContent content={`
                Let's not kid ourselves: first impressions are really important. When you meet someone for the first time, the way you look and act is seared into their brain, and it will undoubtedly influence any future dealings you have with that person.

                You may have found it annoying at the time, but she was right. A smile can make a big difference in whether or not you win someone over.
              `} />

              {/* Chapter Actions */}
              <ChapterActions 
                sources={[
                  { logo: '/images/cnbc-logo.png', alt: 'CNBC' },
                  { logo: '/images/cbs-logo.png', alt: 'CBS' },
                  { logo: '/images/bt-logo.png', alt: 'BT' }
                ]}
                sourceCount={4}
                highlightCount={12}
                commentCount={18}
              />
            </div>

            {/* Questions */}
            <QuestionsList questions={mockQuestions} />
          </div>

          {/* Table of Contents */}
          <div className="max-w-[30%] hidden md:block">
            <TableOfContents sections={sections} />
          </div>
        </div>
      </div>
    </div>
  );
} 