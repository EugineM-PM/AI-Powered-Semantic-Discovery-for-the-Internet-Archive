import { SearchResultItem, SearchResponse, TimelineDensityItem } from '../types';

export const POPULAR_SEARCH_CHIPS = [
  'cancel culture',
  'climate change denial',
  'net neutrality',
  'COVID misinformation',
  'blockchain',
  'Y2K bug warnings'
];

export const INITIAL_RECENT_SEARCHES = [
  { query: 'First use of "cancel culture" on .edu websites', timestamp: '10 minutes ago' },
  { query: 'early climate change denial op-eds 1998', timestamp: '2 hours ago' },
  { query: 'FCC net neutrality public comments 2003', timestamp: 'Yesterday' }
];

// Helper to generate density timeline for years 1996-2024
export function generateTimelineData(results: SearchResultItem[]): TimelineDensityItem[] {
  const yearCounts: Record<number, number> = {};
  for (let year = 1996; year <= 2024; year++) {
    yearCounts[year] = 0;
  }

  // Count matches
  results.forEach(res => {
    if (yearCounts[res.snapshotYear] !== undefined) {
      yearCounts[res.snapshotYear] += 1;
    }
  });

  // Base artificial background archive activity curves if sparse
  const maxCount = Math.max(...Object.values(yearCounts), 1);

  return Object.keys(yearCounts).map(yStr => {
    const year = parseInt(yStr, 10);
    const count = yearCounts[year];
    // Baseline density calculation
    let density = count > 0 ? Math.min(100, Math.max(15, (count / maxCount) * 100)) : 0;
    return {
      year,
      count,
      densityPercent: density
    };
  });
}

export const MOCK_RESULTS_CANCEL_CULTURE: SearchResultItem[] = [
  {
    id: 'cc-edu-2015-michigan',
    title: 'The Evolution of Online Accountability and "Cancel Culture" in Campus Discourse',
    domain: 'michigandaily.com',
    fullUrl: 'https://www.michigandaily.com/opinion/cancel-culture-dialogue/',
    archiveDate: 'March 14, 2015',
    timestampFormatted: '2015-03-14 11:42:05 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20150314114205/https://michigandaily.com/opinion/cancel-culture-dialogue/',
    snapshotYear: 2015,
    snippet: '...what student activists are referring to on social media as "cancel culture" has moved from Black Twitter vernacular into university forum debates regarding speaker invitations and campus safety...',
    snippetHighlights: ['cancel culture', 'Black Twitter vernacular', 'university forum debates'],
    confidenceScore: 98,
    primarySourceVerified: true,
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://www.michigandaily.com/opinion/cancel-culture-dialogue/\nWARC-Date: 2015-03-14T11:42:05Z\nWARC-Record-ID: <urn:uuid:52b1239e-2921-4f9e-a22b-8a19280e2101>',
    tld: 'edu',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'The Evolution of Online Accountability and "Cancel Culture"' },
      { fieldName: 'h1', label: 'H1 Heading', matchedText: 'Cancel Culture in Campus Discourse' },
      { fieldName: 'body', label: 'Body Text Context', matchedText: 'student activists are referring to on social media as "cancel culture"' },
      { fieldName: 'url', label: 'URL Path', matchedText: '/opinion/cancel-culture-dialogue/' }
    ],
    matchedTerms: ['cancel culture', '.edu domain', '2015 earliest record', 'campus discourse'],
    whyMatched: 'Matches semantic concept of "cancel culture" in higher education publishing. Earliest verified capture on an accredited higher education domain (.edu affiliate publication).',
    authorOrSource: 'University of Michigan — The Michigan Daily (Opinion Section)',
    citationData: {
      apa: 'The Michigan Daily. (2015, March 14). The evolution of online accountability and "cancel culture" in campus discourse. Internet Archive Wayback Machine. https://web.archive.org/web/20150314114205/https://michigandaily.com/opinion/cancel-culture-dialogue/',
      mla: '"The Evolution of Online Accountability and \'Cancel Culture\' in Campus Discourse." The Michigan Daily, 14 Mar. 2015. Internet Archive Wayback Machine, web.archive.org/web/20150314114205/https://michigandaily.com/opinion/cancel-culture-dialogue/.',
      chicago: 'The Michigan Daily. "The Evolution of Online Accountability and \'Cancel Culture\' in Campus Discourse." March 14, 2015. Internet Archive Wayback Machine. https://web.archive.org/web/20150314114205/https://michigandaily.com/opinion/cancel-culture-dialogue/.',
      bibtex: `@misc{michigan2015cancel,\n  title={The Evolution of Online Accountability and "Cancel Culture" in Campus Discourse},\n  author={The Michigan Daily},\n  year={2015},\n  month={Mar},\n  howpublished={Internet Archive Wayback Machine},\n  url={https://web.archive.org/web/20150314114205/https://michigandaily.com/opinion/cancel-culture-dialogue/}\n}`
    },
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>The Evolution of Online Accountability and "Cancel Culture" - The Michigan Daily (Archived 2015)</title>
        <style>
          body { font-family: Georgia, serif; line-height: 1.6; color: #222; background: #faf9f6; margin: 0; padding: 0; }
          .header { border-bottom: 2px solid #00274c; padding: 20px 40px; background: #fff; }
          .logo { font-family: "Times New Roman", serif; font-size: 32px; font-weight: bold; color: #00274c; letter-spacing: -0.5px; }
          .sub { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-top: 4px; }
          .container { max-w: 800px; margin: 40px auto; padding: 0 20px; background: #fff; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
          .article-inner { padding: 40px; }
          .kicker { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #900; letter-spacing: 1.5px; }
          h1 { font-size: 34px; margin: 10px 0 15px; font-weight: normal; line-height: 1.2; color: #111; }
          .byline { font-size: 14px; color: #555; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 10px 0; margin-bottom: 25px; }
          .content p { font-size: 18px; line-height: 1.7; margin-bottom: 20px; color: #2c2c2c; }
          .highlight-term { background-color: #fef08a; padding: 2px 4px; font-weight: 600; border-radius: 2px; border-bottom: 2px solid #eab308; }
          .archive-stamp-note { background: #eff6ff; border-left: 4px solid #2563eb; padding: 12px 16px; font-size: 13px; font-family: sans-serif; color: #1e40af; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">The Michigan Daily</div>
          <div class="sub">University of Michigan — Founded 1890 | Archived Campus Record</div>
        </div>
        <div class="container">
          <div class="article-inner">
            <div class="archive-stamp-note">
              <strong>Wayback Machine Capture Notice:</strong> Captured on March 14, 2015 11:42:05 UTC. Verified SHA-256 WARC Payload Match.
            </div>
            <div class="kicker">Opinion & Social Commentary</div>
            <h1>The Evolution of Online Accountability and "<span class="highlight-term">Cancel Culture</span>" in Campus Discourse</h1>
            <div class="byline">By Maya Lin, Senior Staff Columnist | Published March 12, 2015 08:30 EST</div>
            <div class="content">
              <p>In recent months, student organizing across college campuses has undergone a distinct shift driven by digital networking platforms. What student activists are referring to on social media as "<span class="highlight-term">cancel culture</span>" has moved from <span class="highlight-term">Black Twitter vernacular</span> into <span class="highlight-term">university forum debates</span> regarding speaker invitations, institutional accountability, and campus community standards.</p>
              <p>Originally popularized in hip-hop lyrics and Black social media circles as a humorous phrase to signify withdrawing support from a public figure or brand, "canceling" someone has taken on new systemic weight. On university message boards and student council meetings, the rhetoric of being "canceled" reflects a fast-moving mechanism for public disavowal.</p>
              <p>Critics argue that this rapid socially enforced boycott stifles open dialogue and nuance in academic spaces. Proponents, however, contend that public calls for cancellation provide marginalized groups a rare lever of leverage against institutional figures who previously operated without public scrutiny.</p>
              <p>As academic departments navigate these new social dynamics, understanding the linguistic origins and political function of "<span class="highlight-term">cancel culture</span>" is essential for fostering genuine collegiate discourse in an era where digital memory is permanent.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  },
  {
    id: 'cc-edu-2015-berkman',
    title: 'Research Brief: Vernacular Lexicon Shifts in Digital Public Spheres',
    domain: 'cyber.harvard.edu',
    fullUrl: 'https://cyber.harvard.edu/research/briefs/2015/online-lexicon-cancel-culture/',
    archiveDate: 'October 28, 2015',
    timestampFormatted: '2015-10-28 16:09:12 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20151028160912/https://cyber.harvard.edu/research/briefs/2015/online-lexicon-cancel-culture/',
    snapshotYear: 2015,
    snippet: '...examining how linguistic constructs like "call-out culture" and "<span class="highlight-term">cancel culture</span>" propagate across networked youth communities and academic discourse spaces...',
    snippetHighlights: ['cancel culture', 'academic discourse spaces', 'networked youth communities'],
    confidenceScore: 95,
    primarySourceVerified: true,
    sha256Hash: 'a8f7c123098bfe12d098711ef87123991280381029318182903819283918293',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://cyber.harvard.edu/research/briefs/2015/online-lexicon-cancel-culture/\nWARC-Date: 2015-10-28T16:09:12Z\nWARC-Record-ID: <urn:uuid:91a2384c-1234-4a21-99cc-128391203910>',
    tld: 'edu',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'Vernacular Lexicon Shifts in Digital Public Spheres' },
      { fieldName: 'body', label: 'Abstract Body', matchedText: 'linguistic constructs like "call-out culture" and "cancel culture"' },
      { fieldName: 'anchorText', label: 'PDF Working Paper Link', matchedText: 'Download PDF: Online Lexicon & Cancel Culture Analysis' }
    ],
    matchedTerms: ['cancel culture', 'harvard.edu', 'digital public spheres', 'media research'],
    whyMatched: 'Academic research paper indexing at Berkman Klein Center for Internet & Society at Harvard University.',
    authorOrSource: 'Harvard University — Berkman Klein Center for Internet & Society',
    citationData: {
      apa: 'Berkman Klein Center for Internet & Society. (2015, October 28). Research brief: Vernacular lexicon shifts in digital public spheres. Harvard University. Internet Archive Wayback Machine. https://web.archive.org/web/20151028160912/https://cyber.harvard.edu/research/briefs/2015/online-lexicon-cancel-culture/',
      mla: '"Research Brief: Vernacular Lexicon Shifts in Digital Public Spheres." Berkman Klein Center, Harvard University, 28 Oct. 2015. Internet Archive Wayback Machine.',
      chicago: 'Berkman Klein Center. "Research Brief: Vernacular Lexicon Shifts in Digital Public Spheres." Harvard University, October 28, 2015.',
      bibtex: `@misc{harvard2015lexicon,\n  title={Research Brief: Vernacular Lexicon Shifts in Digital Public Spheres},\n  author={Berkman Klein Center for Internet \\& Society},\n  institution={Harvard University},\n  year={2015}\n}`
    },
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Research Brief: Vernacular Lexicon Shifts - Harvard Berkman Klein Center (Archived 2015)</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; background: #f8fafc; margin: 0; padding: 0; }
          .top-bar { background: #a51c30; color: white; padding: 16px 32px; font-weight: 600; font-size: 20px; letter-spacing: -0.3px; }
          .main { max-width: 860px; margin: 40px auto; background: white; border: 1px solid #e2e8f0; padding: 48px; border-radius: 8px; }
          h1 { color: #a51c30; font-size: 30px; margin-top: 0; }
          .meta { font-size: 14px; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
          .highlight-term { background-color: #fef08a; padding: 2px 4px; font-weight: 600; border-radius: 2px; border-bottom: 2px solid #eab308; }
          .paper-box { background: #f1f5f9; padding: 20px; border-radius: 6px; border-left: 4px solid #a51c30; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="top-bar">HARVARD UNIVERSITY | Berkman Klein Center for Internet & Society</div>
        <div class="main">
          <h1>Research Brief: Vernacular Lexicon Shifts in Digital Public Spheres</h1>
          <div class="meta">Published: October 2015 | Research Group: Youth & Media Project | Topic ID: YM-2015-09</div>
          <p>This working paper documents shifts in digital vernacular among American high school and undergraduate demographics between 2013 and 2015.</p>
          <div class="paper-box">
            <strong>Key Finding:</strong> Examining how linguistic constructs like "call-out culture" and "<span class="highlight-term">cancel culture</span>" propagate across networked youth communities and academic discourse spaces reveals significant changes in peer enforcement and online reputation management.
          </div>
          <p>While early instances of "cancel" were recorded in comedic tweets from 2014, by late 2015 the term evolved into an umbrella descriptor for collective public shaming campaigns on Tumblr, Twitter, and collegiate student forums.</p>
        </div>
      </body>
      </html>
    `
  },
  {
    id: 'cc-edu-2016-columbia',
    title: 'The Terminology of Digital Rejection: From Hashtag Activism to Campus Policy',
    domain: 'cjr.org',
    fullUrl: 'https://www.cjr.org/analysis/cancel_culture_media_coverage.php',
    archiveDate: 'February 11, 2016',
    timestampFormatted: '2016-02-11 09:20:44 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20160211092044/https://www.cjr.org/analysis/cancel_culture_media_coverage.php',
    snapshotYear: 2016,
    snippet: '...Columbia Journalism Review investigates how journalists began adapting the term "cancel culture" to describe political boycotts and academic public letters...',
    snippetHighlights: ['cancel culture', 'academic public letters', 'Columbia Journalism Review'],
    confidenceScore: 92,
    primarySourceVerified: true,
    sha256Hash: 'c9d8123091283901238910283901283901283901283901283901283901283901',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://www.cjr.org/analysis/cancel_culture_media_coverage.php\nWARC-Date: 2016-02-11T09:20:44Z',
    tld: 'org',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'The Terminology of Digital Rejection' },
      { fieldName: 'h1', label: 'Main Headline', matchedText: 'From Hashtag Activism to Campus Policy: Cancel Culture' }
    ],
    matchedTerms: ['cancel culture', 'Columbia Journalism Review', 'media discourse 2016'],
    whyMatched: 'Analysis published under Columbia Journalism Review (Columbia Graduate School of Journalism affiliated).',
    authorOrSource: 'Columbia Journalism Review (Columbia University School of Journalism)',
    citationData: {
      apa: 'Columbia Journalism Review. (2016, February 11). The terminology of digital rejection: From hashtag activism to campus policy. Internet Archive Wayback Machine.',
      mla: '"The Terminology of Digital Rejection." Columbia Journalism Review, 11 Feb. 2016. Internet Archive Wayback Machine.',
      chicago: 'Columbia Journalism Review. "The Terminology of Digital Rejection." February 11, 2016.',
      bibtex: `@article{cjr2016cancel,\n  title={The Terminology of Digital Rejection},\n  journal={Columbia Journalism Review},\n  year={2016}\n}`
    }
  },
  {
    id: 'cc-edu-2016-stanford',
    title: 'Digital Sociology Symposium: Social Media Norms and Student Activism',
    domain: 'sociology.stanford.edu',
    fullUrl: 'https://sociology.stanford.edu/events/2016/symposium-social-media-norms-cancel-culture',
    archiveDate: 'May 19, 2016',
    timestampFormatted: '2016-05-19 14:10:00 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20160519141000/https://sociology.stanford.edu/events/2016/symposium-social-media-norms-cancel-culture',
    snapshotYear: 2016,
    snippet: '...Panel 2: "Call-outs, Doxxing, and <span class="highlight-term">Cancel Culture</span>: Modern Dynamics of Peer Enforcement in Online Communities." Abstract submission by Dept of Sociology...',
    snippetHighlights: ['Cancel Culture', 'Stanford Dept of Sociology', 'Peer Enforcement'],
    confidenceScore: 91,
    primarySourceVerified: true,
    sha256Hash: 'f001293012930129301293012930129301293012930129301293012930129301',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://sociology.stanford.edu/events/2016/symposium-social-media-norms-cancel-culture',
    tld: 'edu',
    matchedFields: [
      { fieldName: 'h1', label: 'Event Title', matchedText: 'Symposium: Social Media Norms and Cancel Culture' },
      { fieldName: 'body', label: 'Panel Abstract', matchedText: 'Call-outs, Doxxing, and Cancel Culture' }
    ],
    matchedTerms: ['cancel culture', 'stanford.edu', 'sociology department event'],
    whyMatched: 'Stanford University Sociology Department event listing & abstract.',
    authorOrSource: 'Stanford University — Department of Sociology',
    citationData: {
      apa: 'Stanford University Department of Sociology. (2016, May 19). Digital sociology symposium: Social media norms and student activism. Internet Archive Wayback Machine.',
      mla: '"Digital Sociology Symposium." Stanford Dept of Sociology, 19 May 2016. Internet Archive Wayback Machine.',
      chicago: 'Stanford Department of Sociology. "Digital Sociology Symposium." May 19, 2016.',
      bibtex: `@misc{stanford2016cancel,\n  title={Digital Sociology Symposium: Social Media Norms and Student Activism},\n  author={Stanford Sociology Dept},\n  year={2016}\n}`
    }
  },
  {
    id: 'cc-edu-2017-yale',
    title: 'Free Speech and the Boundaries of Modern Ostracism',
    domain: 'yaledailynews.com',
    fullUrl: 'https://yaledailynews.com/blog/2017/01/22/free-speech-and-cancel-culture/',
    archiveDate: 'January 22, 2017',
    timestampFormatted: '2017-01-22 08:15:22 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20170122081522/https://yaledailynews.com/blog/2017/01/22/free-speech-and-cancel-culture/',
    snapshotYear: 2017,
    snippet: '...examining how "cancel culture" transitioned from an informal internet phrase into a prominent focal point for university administration debates across the Ivy League...',
    snippetHighlights: ['cancel culture', 'Yale Daily News', 'Ivy League administration'],
    confidenceScore: 89,
    primarySourceVerified: true,
    sha256Hash: 'd712391023910239102391023910239102391023910239102391023910239102',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://yaledailynews.com/blog/2017/01/22/free-speech-and-cancel-culture/',
    tld: 'edu',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'Free Speech and the Boundaries of Modern Ostracism' },
      { fieldName: 'url', label: 'URL Path', matchedText: '/blog/2017/01/22/free-speech-and-cancel-culture/' }
    ],
    matchedTerms: ['cancel culture', 'yaledailynews.com', 'ivy league'],
    whyMatched: 'Student newspaper archive for Yale University.',
    authorOrSource: 'Yale Daily News (Yale University)',
    citationData: {
      apa: 'Yale Daily News. (2017, January 22). Free speech and the boundaries of modern ostracism. Internet Archive Wayback Machine.',
      mla: '"Free Speech and the Boundaries of Modern Ostracism." Yale Daily News, 22 Jan. 2017.',
      chicago: 'Yale Daily News. "Free Speech and the Boundaries of Modern Ostracism." January 22, 2017.',
      bibtex: `@article{yale2017cancel,\n  title={Free Speech and the Boundaries of Modern Ostracism},\n  author={Yale Daily News},\n  year={2017}\n}`
    }
  },
  {
    id: 'cc-gov-2019-loc',
    title: 'Web Archiving Focus: Sociolinguistics of the American Web 2010–2020',
    domain: 'blogs.loc.gov',
    fullUrl: 'https://blogs.loc.gov/thesignal/2019/11/sociolinguistics-web-archive-cancel-culture/',
    archiveDate: 'November 14, 2019',
    timestampFormatted: '2019-11-14 13:00:10 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20191114130010/https://blogs.loc.gov/thesignal/2019/11/sociolinguistics-web-archive-cancel-culture/',
    snapshotYear: 2019,
    snippet: '...The Signal blog at Library of Congress analyzes web capture logs identifying early emergence of terms like "cancel culture" across university web domains beginning circa 2015...',
    snippetHighlights: ['cancel culture', 'Library of Congress', 'university web domains'],
    confidenceScore: 88,
    primarySourceVerified: true,
    sha256Hash: '1239102391023910239102391023910239102391023910239102391023910239',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://blogs.loc.gov/thesignal/2019/11/sociolinguistics-web-archive-cancel-culture/',
    tld: 'gov',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'Sociolinguistics of the American Web' },
      { fieldName: 'body', label: 'Archive Analysis Body', matchedText: 'identifying early emergence of terms like "cancel culture" across university web domains' }
    ],
    matchedTerms: ['cancel culture', '.gov domain', 'Library of Congress web archive'],
    whyMatched: 'Library of Congress web archiving division technical research blog post.',
    authorOrSource: 'Library of Congress (loc.gov) — The Signal Archiving Blog',
    citationData: {
      apa: 'Library of Congress. (2019, November 14). Web archiving focus: Sociolinguistics of the American Web 2010–2020. Internet Archive Wayback Machine.',
      mla: '"Web Archiving Focus." Library of Congress, 14 Nov. 2019. Internet Archive Wayback Machine.',
      chicago: 'Library of Congress. "Web Archiving Focus." November 14, 2019.',
      bibtex: `@misc{loc2019signal,\n  title={Web Archiving Focus: Sociolinguistics of the American Web 2010–2020},\n  author={Library of Congress},\n  year={2019}\n}`
    }
  }
];

// Other default topics mock responses
export const MOCK_RESULTS_CLIMATE_CHANGE_DENIAL: SearchResultItem[] = [
  {
    id: 'climate-1998-global',
    title: 'Global Climate Science Communications Action Plan (Leaked Internal Memo)',
    domain: 'eff.org',
    fullUrl: 'https://www.eff.org/files/climate_plan_1998.html',
    archiveDate: 'December 04, 1998',
    timestampFormatted: '1998-12-04 18:22:10 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/19981204182210/https://www.eff.org/files/climate_plan_1998.html',
    snapshotYear: 1998,
    snippet: '..."Victory will be achieved when average citizens understand uncertainties in climate science; when recognition of uncertainty becomes part of conventional wisdom regarding climate change denial..."',
    snippetHighlights: ['climate change denial', 'uncertainties in climate science', 'Global Climate Science'],
    confidenceScore: 97,
    primarySourceVerified: true,
    sha256Hash: '98a7123091283012983019283019283019283019283019283019283019283019',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://www.eff.org/files/climate_plan_1998.html',
    tld: 'org',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'Global Climate Science Communications Action Plan' },
      { fieldName: 'body', label: 'Document Text', matchedText: 'uncertainties in climate science regarding climate change denial' }
    ],
    matchedTerms: ['climate change denial', '1998 archive record', 'primary source memo'],
    whyMatched: 'Earliest digitized public archive of the 1998 energy industry public relations memo on climate science uncertainty.',
    authorOrSource: 'Electronic Frontier Foundation (EFF Archive)',
    citationData: {
      apa: 'Electronic Frontier Foundation. (1998, December 4). Global climate science communications action plan. Internet Archive Wayback Machine.',
      mla: '"Global Climate Science Communications Action Plan." EFF, 4 Dec. 1998. Internet Archive Wayback Machine.',
      chicago: 'Electronic Frontier Foundation. "Global Climate Science Communications Action Plan." December 4, 1998.',
      bibtex: `@misc{eff1998climate,\n  title={Global Climate Science Communications Action Plan},\n  author={EFF Archive},\n  year={1998}\n}`
    }
  },
  {
    id: 'climate-2001-ipcc',
    title: 'IPCC Third Assessment Report: Working Group II Climate Impacts',
    domain: 'ipcc.ch',
    fullUrl: 'https://www.ipcc.ch/report/ar3/wg2/index.htm',
    archiveDate: 'June 18, 2001',
    timestampFormatted: '2001-06-18 04:12:00 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20010618041200/https://www.ipcc.ch/report/ar3/wg2/index.htm',
    snapshotYear: 2001,
    snippet: '...addressing public campaigns characterized by scientists as climate change denial or institutional climate skepticism ahead of international treaties...',
    snippetHighlights: ['climate change denial', 'climate skepticism', 'IPCC Third Assessment'],
    confidenceScore: 94,
    primarySourceVerified: true,
    sha256Hash: '1112391023910239102391023910239102391023910239102391023910239102',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://www.ipcc.ch/report/ar3/wg2/index.htm',
    tld: 'org',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'IPCC Third Assessment Report' },
      { fieldName: 'body', label: 'Report Executive Summary', matchedText: 'campaigns characterized by scientists as climate change denial' }
    ],
    matchedTerms: ['climate change denial', 'ipcc.org', '2001 UN climate report'],
    whyMatched: 'Official Intergovernmental Panel on Climate Change archived web portal.',
    authorOrSource: 'Intergovernmental Panel on Climate Change (IPCC)',
    citationData: {
      apa: 'IPCC. (2001, June 18). IPCC third assessment report: Working group II climate impacts. Internet Archive Wayback Machine.',
      mla: '"IPCC Third Assessment Report." IPCC, 18 Jun. 2001. Internet Archive Wayback Machine.',
      chicago: 'IPCC. "IPCC Third Assessment Report." June 18, 2001.',
      bibtex: `@misc{ipcc2001ar3,\n  title={IPCC Third Assessment Report: Working Group II Climate Impacts},\n  author={IPCC},\n  year={2001}\n}`
    }
  }
];

export const MOCK_RESULTS_NET_NEUTRALITY: SearchResultItem[] = [
  {
    id: 'nn-2003-wu',
    title: 'Network Neutrality, Broadband Discrimination (Paper Abstract by Tim Wu)',
    domain: 'law.columbia.edu',
    fullUrl: 'https://www.law.columbia.edu/faculty/tim-wu/net-neutrality-2003',
    archiveDate: 'June 02, 2003',
    timestampFormatted: '2003-06-02 14:15:22 UTC',
    archiveWaybackUrl: 'https://web.archive.org/web/20030602141522/https://www.law.columbia.edu/faculty/tim-wu/net-neutrality-2003',
    snapshotYear: 2003,
    snippet: '...Professor Tim Wu introduces the concept of "net neutrality" to describe regulatory framework preventing internet service providers from prioritizing traffic...',
    snippetHighlights: ['net neutrality', 'Tim Wu', 'broadband discrimination'],
    confidenceScore: 99,
    primarySourceVerified: true,
    sha256Hash: '77a8123019283019283019283019283019283019283019283019283019283019',
    warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Target-URI: https://www.law.columbia.edu/faculty/tim-wu/net-neutrality-2003',
    tld: 'edu',
    matchedFields: [
      { fieldName: 'title', label: 'Page Title', matchedText: 'Network Neutrality, Broadband Discrimination' },
      { fieldName: 'body', label: 'Paper Abstract', matchedText: 'introduces the concept of "net neutrality"' }
    ],
    matchedTerms: ['net neutrality', 'columbia.edu', '2003 coining paper'],
    whyMatched: 'Primary source academic archive coining "net neutrality" by Prof. Tim Wu at Columbia Law School.',
    authorOrSource: 'Columbia Law School — Professor Tim Wu',
    citationData: {
      apa: 'Wu, T. (2003, June 2). Network neutrality, broadband discrimination. Columbia Law School. Internet Archive Wayback Machine.',
      mla: 'Wu, Tim. "Network Neutrality, Broadband Discrimination." Columbia Law School, 2 Jun. 2003.',
      chicago: 'Wu, Tim. "Network Neutrality, Broadband Discrimination." Columbia Law School, June 2, 2003.',
      bibtex: `@article{wu2003net,\n  title={Network Neutrality, Broadband Discrimination},\n  author={Wu, Tim},\n  institution={Columbia Law School},\n  year={2003}\n}`
    }
  }
];

// Generic fallback mock query handler
export function getMockResponseForQuery(query: string, tldFilter: string = 'all'): SearchResponse {
  const lowerQuery = query.toLowerCase().trim();
  let results: SearchResultItem[] = [];
  let intent = 'Historical Concept Retrieval';
  let concepts = [query];
  let domainConstraint = tldFilter !== 'all' ? `Filtered by .${tldFilter}` : 'All Web Domains';

  if (lowerQuery.includes('cancel culture') || lowerQuery.includes('cancel')) {
    results = MOCK_RESULTS_CANCEL_CULTURE;
    intent = 'Linguistic origins and earliest academic campus references to "cancel culture"';
    concepts = ['cancel culture', 'campus discourse', 'digital sociology', '.edu journals'];
  } else if (lowerQuery.includes('climate')) {
    results = MOCK_RESULTS_CLIMATE_CHANGE_DENIAL;
    intent = 'Early web advocacy & institutional public position papers on climate change';
    concepts = ['climate change denial', 'environmental policy', 'IPCC', 'leaked memos'];
  } else if (lowerQuery.includes('neutrality') || lowerQuery.includes('net')) {
    results = MOCK_RESULTS_NET_NEUTRALITY;
    intent = 'Legal origins and early policy filings regarding network neutrality';
    concepts = ['net neutrality', 'telecom regulation', 'FCC filings', 'Columbia Law School'];
  } else {
    // Dynamically build a custom mock result set if no exact match
    results = [
      {
        id: `mock-res-1-${Date.now()}`,
        title: `Historical Web Index: "${query}" in Early Academic & Institutional Repositories`,
        domain: lowerQuery.includes('edu') || tldFilter === 'edu' ? 'research.columbia.edu' : 'archive.org',
        fullUrl: `https://research.columbia.edu/archives/topics/${encodeURIComponent(query)}`,
        archiveDate: 'April 18, 2008',
        timestampFormatted: '2008-04-18 10:14:02 UTC',
        archiveWaybackUrl: `https://web.archive.org/web/20080418101402/https://research.columbia.edu/archives/topics/${encodeURIComponent(query)}`,
        snapshotYear: 2008,
        snippet: `...archived documentation and early digital references corresponding to the query concept "${query}". Web captures from early 2000s university servers...`,
        snippetHighlights: [query, 'archived documentation', 'early digital references'],
        confidenceScore: 94,
        primarySourceVerified: true,
        sha256Hash: '9812391283918239182391829318293819283912839182391283912839128391',
        warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Date: 2008-04-18T10:14:02Z',
        tld: tldFilter === 'edu' ? 'edu' : 'org',
        matchedFields: [
          { fieldName: 'title', label: 'Page Title', matchedText: `Historical Web Index: ${query}` },
          { fieldName: 'body', label: 'Body Text', matchedText: `references corresponding to the query concept "${query}"` }
        ],
        matchedTerms: [query, 'historical web capture', 'digital primary source'],
        whyMatched: `Matched semantic intent for "${query}" across digitized web archives.`,
        authorOrSource: 'Columbia University Digital Collections',
        citationData: {
          apa: `Columbia University Archives. (2008, April 18). Historical web index: ${query}. Internet Archive Wayback Machine.`,
          mla: `"Historical Web Index: ${query}." Columbia University, 18 Apr. 2008.`,
          chicago: `Columbia University Archives. "Historical Web Index: ${query}." April 18, 2008.`,
          bibtex: `@misc{columbia2008${query.replace(/[^a-z]/gi, '')},\n  title={Historical Web Index: ${query}},\n  author={Columbia Archives},\n  year={2008}\n}`
        }
      },
      {
        id: `mock-res-2-${Date.now()}`,
        title: `University Policy & Public Forum Records: Discourse on ${query}`,
        domain: 'umich.edu',
        fullUrl: `https://www.umich.edu/forum/2012/papers/${encodeURIComponent(query)}.html`,
        archiveDate: 'November 09, 2012',
        timestampFormatted: '2012-11-09 15:30:00 UTC',
        archiveWaybackUrl: `https://web.archive.org/web/20121109153000/https://www.umich.edu/forum/2012/papers/${encodeURIComponent(query)}.html`,
        snapshotYear: 2012,
        snippet: `...campus policy discussion outlining the emergence of ${query} across academic bulletin boards and digital student archives...`,
        snippetHighlights: [query, 'campus policy', 'academic bulletin boards'],
        confidenceScore: 91,
        primarySourceVerified: true,
        sha256Hash: '1289381928391823918293819283912839128391283912839128391283912839',
        warcHeader: 'WARC/1.0\nWARC-Type: response\nWARC-Date: 2012-11-09T15:30:00Z',
        tld: 'edu',
        matchedFields: [
          { fieldName: 'title', label: 'Page Title', matchedText: `Discourse on ${query}` },
          { fieldName: 'h1', label: 'H1 Tag', matchedText: `University Forum on ${query}` }
        ],
        matchedTerms: [query, 'umich.edu', 'university policy archive'],
        whyMatched: 'Matches campus bulletin captures and digital repository records.',
        authorOrSource: 'University of Michigan Digital Repositories',
        citationData: {
          apa: `University of Michigan. (2012, November 9). University policy records: ${query}. Internet Archive Wayback Machine.`,
          mla: `"University Policy Records: ${query}." University of Michigan, 9 Nov. 2012.`,
          chicago: `University of Michigan. "University Policy Records: ${query}." November 9, 2012.`,
          bibtex: `@misc{umich2012${query.replace(/[^a-z]/gi, '')},\n  title={University Policy Records: ${query}},\n  year={2012}\n}`
        }
      }
    ];
  }

  // Filter by TLD if needed
  if (tldFilter !== 'all') {
    results = results.filter(r => r.tld === tldFilter);
  }

  const timeline = generateTimelineData(results);

  return {
    query,
    results,
    timeline,
    interpretation: {
      rawQuery: query,
      intent,
      extractedConcepts: concepts,
      temporalRange: '1996–2024',
      domainConstraint,
      academicContext: 'Primary source archived web pages with verified WARC headers and timestamp integrity.'
    },
    totalResults: results.length * 142 + 8, // Realistic search count
    searchTimeMs: 240
  };
}
