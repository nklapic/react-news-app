import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {ArticleBaseComponent} from './views/article/ArticleComponent';
import {Article} from './common/NewsApi';

const testArticle: Article = {
  source: {id: "al-jazeera-english", name: "Al Jazeera English"},
  author: "Ted Regencia, Tamila Varshalomidze, Usaid Siddiqui",
  content: "The Taliban says Afghanistan is a free and sovereign nation as it hails the exit of US troops after 20 years of occupation, describing their departure as a historic moment.\r\nTaliban fighters on Tuesd… [+27320 chars]",
  description: "US president to defend withdrawal of forces after the last US troops left Afghanistan, ending the 20-year war.",
  publishedAt: "2021-08-31T18:33:45Z",
  title: "Taliban says Afghanistan ‘free nation’ as it hails US exit: Live - Al Jazeera English",
  url: "https://www.aljazeera.com/news/2021/8/31/taliban-declares-afghanistans-independence-after-us-withdrawal",
  urlToImage: "https://www.aljazeera.com/wp-content/uploads/2021/08/2021-08-18T225344Z_326053529_RC2R7P9567J9_RTRMADP_3_AFGHANISTAN-CONFLICT.jpg?resize=1200%2C630"
}

test('header is visible', () => {
  render(<App />);
  const header = screen.getByText(/React News App/i);
  expect(header).toBeInTheDocument();
});

test('menu is working', () => {
  render(<App />);
  const drawerButton = screen.getByTestId("drawer");
  drawerButton.click();
  const homePageButton = screen.findByText((/Home/i));
  expect(homePageButton).toBeTruthy();
});


test('Rendering of article works', () => {
  render(<ArticleBaseComponent article={testArticle} />)

  const inputSearchField = screen.getByText(/Ted Regencia, Tamila Varshalomidze, Usaid Siddiqui/i);
  expect(inputSearchField).toBeInTheDocument();
});
