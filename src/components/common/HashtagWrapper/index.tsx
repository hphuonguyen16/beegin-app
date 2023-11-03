import React from 'react'
import Link from 'next/link'

interface HashtagWrapperProps {
  text: string
  className: string
}

const HashtagWrapper: React.FC<HashtagWrapperProps> = ({ text, className }) => {
  const regex = /#(\w+)/g
  const matches: { hashtag: string; index: number }[] = []
  let match

  while ((match = regex.exec(text))) {
    matches.push({ hashtag: match[0], index: match.index })
  }

  const segments: React.ReactNode[] = []
  let lastIndex = 0

  for (const match of matches) {
    const { hashtag, index } = match

    // Add the text segment before the hashtag
    segments.push(
      <span key={lastIndex} className={className}>
        {text.slice(lastIndex, index)}
      </span>
    )

    // Add the hashtag
    segments.push(
      <Link key={index} href={''} className={className} style={{ color: 'blue' }}>
        {hashtag}
      </Link>
    )

    lastIndex = index + hashtag.length
  }

  // Add the remaining text
  segments.push(
    <span key={lastIndex} className={className}>
      {text.slice(lastIndex)}
    </span>
  )

  return <>{segments}</>
}

export default HashtagWrapper
