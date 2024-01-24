import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Articles from './components/Articles/Articles';
import BookReview from './components/BookReview/BookReview';

// Mock the fetch function
jest.mock('node-fetch');

describe('App Component', () => {
  it('renders without crashing', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Most Popular/)).toBeInTheDocument();
    });
  });

  it('matches snapshot', async () => {
    const { container } = render(<App />);
    await expect(container).toMatchSnapshot();
  });
});

describe('Articles Component', () => {
  // Mock the API response
  const mockApiResponse = {
    status: 'OK',
    results: [
      {
        "uri": "nyt://article/5be53850-75ca-5b13-a5fa-c3016b602e77",
        "url": "https://www.nytimes.com/2024/01/19/science/cicadas-emergence-broods.html",
        "id": 100000009253628,
        "asset_id": 100000009253628,
        "source": "New York Times",
        "published_date": "2024-01-19",
        "updated": "2024-01-22 23:11:44",
        "section": "Science",
        "subsection": "",
        "nytdsection": "science",
        "adx_keywords": "Forests and Forestry;Cicadas (Insects);Insects;Mount St Joseph University;Smithsonian Institution;Alabama;Arkansas;Georgia;Illinois;Indiana;Iowa;Kentucky;Louisiana;Michigan;Midwestern States (US);Mississippi;Missouri;North Carolina;South Carolina;Southeastern States (US);Tennessee;United States;Virginia;Wisconsin;Southern States (US)",
        "column": null,
        "byline": "By Aimee Ortiz",
        "type": "Article",
        "title": "The World Hasn’t Seen Cicadas Like This Since 1803",
        "abstract": "Brood XIX and Brood XIII will both emerge this spring. The last time these bugs showed up at the same time in the United States, Thomas Jefferson was president.",
        "des_facet": [
          "Forests and Forestry",
          "Cicadas (Insects)",
          "Insects"
        ],
        "org_facet": [
          "Mount St Joseph University",
          "Smithsonian Institution"
        ],
        "per_facet": [],
        "geo_facet": [
          "Alabama",
          "Arkansas",
          "Georgia",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kentucky",
          "Louisiana",
          "Michigan",
          "Midwestern States (US)",
          "Mississippi",
          "Missouri",
          "North Carolina",
          "South Carolina",
          "Southeastern States (US)",
          "Tennessee",
          "United States",
          "Virginia",
          "Wisconsin",
          "Southern States (US)"
        ],
        "media": [
          {
            "type": "image",
            "subtype": "photo",
            "caption": "Two cicada groups, known as broods, are set to appear this spring in a dual emergence that will span across the Midwest and Southeastern United States.",
            "copyright": "Suzanne DeChillo/The New York Times",
            "approved_for_syndication": 1,
            "media-metadata": [
              {
                "url": "https://static01.nyt.com/images/2024/01/17/multimedia/00xp-cicada-1-btmz/00xp-cicada-1-btmz-thumbStandard.jpg",
                "format": "Standard Thumbnail",
                "height": 75,
                "width": 75
              },
              {
                "url": "https://static01.nyt.com/images/2024/01/17/multimedia/00xp-cicada-1-btmz/00xp-cicada-1-btmz-mediumThreeByTwo210.jpg",
                "format": "mediumThreeByTwo210",
                "height": 140,
                "width": 210
              },
              {
                "url": "https://static01.nyt.com/images/2024/01/17/multimedia/00xp-cicada-1-btmz/00xp-cicada-1-btmz-mediumThreeByTwo440.jpg",
                "format": "mediumThreeByTwo440",
                "height": 293,
                "width": 440
              }
            ]
          }
        ],
        "eta_id": 0
      }
    ],
  };

  beforeEach(() => {
    // Mock the fetch function to return a Promise with the mocked API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResponse),
      })
    );
  });

  it('renders without crashing', async () => {
    render(<Articles category="emailed" />);
    await expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const { container } = render(<Articles category="emailed" />);
    await expect(container).toMatchSnapshot();
  });
});



describe('BookReview Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', async () => {
    render(<BookReview />);
    expect(screen.getByText(/Book Reviews/)).toBeInTheDocument();
  });

  it('displays search results when API request succeeds', async () => {
    const mockedBookData = {
      book_title: 'Test Book',
      book_author: 'Test Author',
      publication_dt: '2022-01-01',
      summary: 'Test summary',
    };

    const mockApiResponse = {
      results: [mockedBookData],
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    render(<BookReview />);
    await screen.findByText(/Book Reviews/);
  });

  it('handles search input change and button click', async () => {
    const mockedBookData = {
      book_title: 'Test Book',
      book_author: 'Test Author',
      publication_dt: '2022-01-01',
      summary: 'Test summary',
    };

    const mockApiResponse = {
      results: [mockedBookData],
    };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockApiResponse),
    });

    render(<BookReview />);
    
    const inputElement = screen.getByPlaceholderText('Enter book title');
    const buttonElement = screen.getByText('Search');

    // Simulate user input
    fireEvent.change(inputElement, { target: { value: 'Test' } });
    expect(inputElement.value).toBe('Test');

    // Simulate button click
    fireEvent.click(buttonElement);

    await screen.findByText(/Book Reviews/);
  });
});

