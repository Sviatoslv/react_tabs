import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const TabsBlockContext = React.createContext();

const tabsOrigin = [
  { title: 'Tab 1', content: 'Some text 1' },
  { title: 'Tab 2', content: 'Some text 2' },
  { title: 'Tab 3', content: 'Some text 3' },
];

const tabsForWord = tabsOrigin.map((tab, index) => ({ ...tab, id: index }));

class App extends React.Component {
  state = {
    tabs: tabsForWord,
    index: 0,
  };

  changeTabOrder = (event) => {
    const { name } = event.target;

    if (name === 'next') {
      this.setState(prevState => ({
        tabs: [...prevState.tabs.slice(1), ...prevState.tabs.slice(0, 1)],
      }));
    }

    if (name === 'back') {
      this.setState(prevState => ({
        tabs: [...prevState.tabs.slice(-1), ...prevState.tabs.slice(0, -1)],
      }));
    }
  }

  onTabSelected = (event) => {
    this.setState({ index: +event.target.name });
  }

  render() {
    const { tabs, index } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>{tabs.length} tabs</h1>

        <TabsBlockContext.Provider
          value={tabs.find(tab => tab.id === index).content}
        >
          <TabsBlock>
            {tabs.map(tab => (
              <TabsBlock.Tab
                title={tab.title}
                id={tab.id}
                onTabSelected={this.onTabSelected}
                index={index}
                key={tab.id}
              >
              </TabsBlock.Tab>
            ))}
          </TabsBlock>
        </TabsBlockContext.Provider>
      </div>
    );
  }
}

const TabsBlock = ({ children }) => (
  <TabsBlockContext.Consumer>
    {value => (
      <div>
        <ul className="Tabs__list">
          {children}
        </ul>

        <div
          className="Tabs-content"
        >
          {value}
        </div>
      </div>
    )}
  </TabsBlockContext.Consumer>
);

TabsBlock.Tab = ({
  onTabSelected, title, id, index,
}) => (
  <li className="Tabs__items">
    <button
      onClick={onTabSelected}
      name={id}
      type="button"
      className={
        index === id ? 'button button--active' : 'button'
      }
      key={id}
    >
      {title}
    </button>
  </li>
);

TabsBlock.propTypes = ({
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
});

TabsBlock.Tab.propTypes = ({
  id: PropTypes.number.isRequired,
  onTabSelected: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
});

export default App;
