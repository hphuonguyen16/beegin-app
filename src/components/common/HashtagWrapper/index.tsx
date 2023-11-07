import React from 'react'
import Link from 'next/link'

interface HashtagWrapperProps {
  text: string
  length?: number | undefined
}

const HashtagWrapper: React.FC<HashtagWrapperProps> = ({ text, length }) => {
  let isOverLength = false
  if (length && text.length > length) {
    text = text.slice(0, length)
    isOverLength = true
  }
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
    segments.push(<span key={lastIndex}>{text.slice(lastIndex, index)}</span>)

    // Add the hashtag
    const href = `/search?hashtag=${hashtag.substring(1)}&f=top`
    segments.push(
      <Link key={index} href={href} style={{ color: 'blue' }}>
        {hashtag}
      </Link>
    )

    lastIndex = index + hashtag.length
  }

  // Add the remaining text
  segments.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>)

  if (isOverLength) {
    segments.push(
      <span key={lastIndex + 1} style={{ fontWeight: '600' }}>
        {' ...'}
      </span>
    )
    return <>{segments}</>
  }
  return <>{segments}</>
}

export default HashtagWrapper
