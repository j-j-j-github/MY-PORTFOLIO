// src/data/poetry.ts

export type PoemTheme = 'unspoken' | 'letting-go' | 'reflections';

export interface PoemItem {
  id: string;
  title: string;
  body: string; // Multi-line text preserving stanzas and line breaks
  date?: string;
  author: string;
  theme: PoemTheme;
}

export const poemThemes: { id: 'all' | PoemTheme; label: string; count?: number }[] = [
  { id: 'all', label: 'All Writings' },
  { id: 'unspoken', label: 'Unspoken Love & Longing' },
  { id: 'letting-go', label: 'The Art of Letting Go' },
  { id: 'reflections', label: 'Reflections & The Almost' },
];

export const poemsData: PoemItem[] = [
  {
    id: 'overlooked',
    title: 'Overlooked',
    theme: 'reflections',
    body: `We complain when the world does not choose us,
when the eyes we hoped for pass us by,
when the hand we wanted chooses someone else.

We ask, Why me? Why not me?
As if being overlooked were the cruelest thing
the world could teach us.

Then there are those who enter already apologising,
who have studied every mirror long enough
to know which doors will never open for them.

They stopped standing in line long before one could say no.
They learned to leave before they could be left,
to loosen their grip before anything could slip away.

Perhaps the worst is not being denied what we wanted.
Perhaps it is watching it pass into someone else's hands
and pretending we never wanted it.

Perhaps the crueler fate is becoming so used to being without
that you forget where you stopped hoping,
and forget you ever thought it could be yours.`,
    date: 'Piece 01',
    author: 'Writings of J',
  },
  {
    id: 'the-almost',
    title: 'The Almost',
    theme: 'reflections',
    body: `I'm familiar with the space beside the finish line,
where effort is acknowledged and endings are decided elsewhere.

Life nods at me kindly, like I’ve done my part.
I pass so many on the way here, I start believing I’ll arrive.
Then I don’t.

They call it success, this standing ahead of the many
and behind the one.

I carry the almost with me, as if I were the almost,
and never the thing itself.

If this is life, it’s strange how often
it knows your name.`,
    date: 'Piece 02',
    author: 'Writings of J',
  },
  {
    id: 'silent-plunge',
    title: 'Silent Plunge',
    theme: 'unspoken',
    body: `"When will you fall in love?" they ask with a sigh,
Unaware of the love that makes my heart fly.

Already fulfilled in the love I've stored,
A tale of love, forever to be adored.

Their curiosity in the air, a mystery to unveil,
But in her love, my heart set sail.

For I've already fallen, deeper than they know,
A silent plunge into an ocean so true.`,
    date: 'Piece 03',
    author: 'Writings of J',
  },
  {
    id: 'a-beautiful-tragedy',
    title: 'A Beautiful Tragedy',
    theme: 'letting-go',
    body: `In the shadows of uncertainty, I stood,
Love's journey ahead, misunderstood.

I knew the road was destined to fray,
Yet I chose to walk it, come what may.

With every heartbeat, a melody of pain,
Yet in your arms, I found my rain.

I held onto the moments, each smile,
For our love was worth every trial.

Though the stars foretold an ending near,
I loved you, despite the looming fear.

In the fabric of time, our love did blend,
A beautiful tragedy, worth every bend.`,
    date: 'Piece 04',
    author: 'Writings of J',
  },
  {
    id: 'clipped-wings',
    title: 'Clipped Wings',
    theme: 'letting-go',
    body: `In the river of time, I'm caught in a flow,
Memories of you, an undertow.
Unable to break free, I'm forever pinned.

They say healing comes with the passing years,
Yet here I am, still drowning in tears.
Bound to a love that won't rescind.

Like a bird with clipped wings, I strive,
Desperate to soar, to feel alive.

But the weight of heartache keeps me grounded,
In a world where happiness is astoundingly hounded.`,
    date: 'Piece 05',
    author: 'Writings of J',
  },
  {
    id: 'galaxies-in-her-gaze',
    title: 'Galaxies in Her Gaze',
    theme: 'unspoken',
    body: `In the depths of her gaze, he found his home,
A sanctuary of love, where he could roam.

With a single look, a connection so deep,
His heart awakened from a slumber, fast asleep.

Her eyes, like galaxies, held infinite allure,
A spark of passion that made his spirit soar.

In that sacred instant, time ceased to exist,
He felt the universe conspire, their love persist.`,
    date: 'Piece 06',
    author: 'Writings of J',
  },
  {
    id: 'timid-courage',
    title: 'Timid Courage',
    theme: 'unspoken',
    body: `In a sea of timid words and uncertain sighs,
The shy boy summoned courage, to his surprise.

With beating heart and trembling hands,
He approached her, his voice breaking the silent lands.

Every word carefully chosen, rehearsed in his mind,
He longed to express the feelings he'd confined.

With hesitant steps, he closed the distance near,
To share his heart's desires, to banish his fear.`,
    date: 'Piece 07',
    author: 'Writings of J',
  },
  {
    id: 'captive-heart',
    title: 'Captive Heart',
    theme: 'letting-go',
    body: `In a battle of hearts, he fought in vain,
To unloose the grip of love's sweet chain.

But with every moment spent in her embrace,
His heart fell deeper, longing for her grace.

Though he tried to resist, to break free,
Her presence held him, a captive, you see.

No matter how he struggled, love's hold grew strong,
For the harder he tried, the harder he fell, all along.`,
    date: 'Piece 08',
    author: 'Writings of J',
  },
  {
    id: 'guarded-walls',
    title: 'Guarded Walls',
    theme: 'reflections',
    body: `In a world where love was merely a game,
He vowed his heart would never feel the same.

But destiny had other plans in sight,
As he fell for her, against all his might.

With guarded walls and a skeptic's view,
He never thought love's grasp would ensue.

But her presence, like a gentle breeze,
Melted his defenses, brought him to his knees.`,
    date: 'Piece 09',
    author: 'Writings of J',
  },
  {
    id: 'bittersweet-release',
    title: 'Bittersweet Release',
    theme: 'letting-go',
    body: `In the realm of love, a bittersweet dance,
I find myself in a difficult stance.
For in my heart, I hold her dear,
Yet the time has come to let her disappear.

Like a butterfly held in my palm,
I long to keep her, bring her no harm.
But true love knows when to set free,
To release her wings and let her be.

She was the sun that brightened my days,
Her laughter, a melody that never fades.
But love's not possession, nor a binding chain,
Sometimes it means letting go, embracing the pain.`,
    date: 'Piece 10',
    author: 'Writings of J',
  },
  {
    id: 'sunshine-in-your-smile',
    title: 'Sunshine in Your Smile',
    theme: 'unspoken',
    body: `Like sunshine, your smile breaks through,
Chasing away any hint of blue.
And with each reply, my world is bright,
A kaleidoscope of sheer delight.

In your laughter, hope begins to bloom,
Dispelling shadows, lifting gloom.
With every reply, my soul takes flight,
A tapestry of happiness, woven so bright.`,
    date: 'Piece 11',
    author: 'Writings of J',
  },
  {
    id: 'the-art-of-letting-go',
    title: 'The Art of Letting Go',
    theme: 'letting-go',
    body: `In the realm of love, a bittersweet dance,
I find myself in a difficult stance.
For in my heart, I hold her dear,
Yet the time has come to let her disappear.

Like a butterfly held in my palm,
I long to keep her, bring her no harm.
But true love knows when to set free,
To release her wings and let her be.

Though tears may fall, and hearts may break,
I'll hold her memory, for love's sake.
In letting her go, a part of me may die,
But I'll cherish the moments, as clouds pass by.`,
    date: 'Piece 12',
    author: 'Writings of J',
  },
  {
    id: 'the-beginning-of-something-unspoken',
    title: 'The Beginning of Something Unspoken',
    theme: 'unspoken',
    body: `In that serendipitous encounter, our paths intertwined,
A moment when destiny whispered, a secret so kind.
She entered the room, a vision in grace,
And little did she know, my heart began to race.`,
    date: 'Piece 13',
    author: 'Writings of J',
  },
  {
    id: 'a-love-kept-in-silence',
    title: 'A Love Kept in Silence',
    theme: 'unspoken',
    body: `In a chance encounter, fate wove its spell,
Love blossomed quietly, like a secret to tell.
Unseen by her, my heart danced in the haze,
A love unrequited, cherished in hidden ways.`,
    date: 'Piece 14',
    author: 'Writings of J',
  },
  {
    id: 'when-she-became-everything',
    title: 'When She Became Everything',
    theme: 'letting-go',
    body: `With her love, life's symphony played on cue,
She became my anchor, my purpose to pursue.
But in her absence, a void pierced the sky,
She became my essence to transcend, a soul's eternal fly.`,
    date: 'Piece 15',
    author: 'Writings of J',
  },
  {
    id: 'the-memory-that-remained',
    title: 'The Memory That Remained',
    theme: 'letting-go',
    body: `Even now, after everything has come to an end,
Her allure remains, a memory I can't suspend.
In the crowd of faces, none can compare,
For she made all others seem dull and bare.`,
    date: 'Piece 16',
    author: 'Writings of J',
  },
  {
    id: 'the-writer-and-his-words',
    title: 'The Writer and His Words',
    theme: 'reflections',
    body: `I am the writer, the thoughts unbound,
But she, the words, brings depth profound.
Together we weave, in perfect accord,
Her graceful lines, the voice I've adored.

With every stroke, I set the scene,
Yet her voice whispers, like a dream.
Through her, emotions find their flight,
Her language, the palette, painting it right.

In this dance of expression, our souls unite,
I bring the vision, she brings the light.
For I am the writer, and she, the words,
In this poetic harmony, our story is heard.`,
    date: 'Piece 17',
    author: 'Writings of J',
  },
  {
    id: 'love-is-meant-to-be-free',
    title: 'Love Is Meant to Be Free',
    theme: 'letting-go',
    body: `Like a fragile feather caught in the breeze,
Love's true essence is to grant it release.
For if it returns, it was meant to stay,
But if it flies away, it's a part of love's way.`,
    date: 'Piece 18',
    author: 'Writings of J',
  },
  {
    id: 'the-beauty-of-what-we-shared',
    title: 'The Beauty of What We Shared',
    theme: 'letting-go',
    body: `Like a canvas painted with vivid hue,
Love's artistry sometimes bids adieu.
But the beauty lies in the strokes we shared,
As we let go gracefully, showing we cared.`,
    date: 'Piece 19',
    author: 'Writings of J',
  },
  {
    id: 'the-moon-even-in-absence',
    title: 'The Moon, Even in Absence',
    theme: 'reflections',
    body: `I have loved the moon in all her grace,
Even when the dawn concealed her face,
And left the heavens an empty space.

For what is love that longs for sight,
That fades when parted from its light,
When I, the night, still long to hold her tight?

Let others love the moon when she is bright,
I shall love her beyond the reach of sight,
Even when she forsakes me, her faithful night.`,
    date: 'Piece 20',
    author: 'Writings of J',
  },
];
