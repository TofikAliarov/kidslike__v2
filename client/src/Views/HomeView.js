import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LeftSideBar from '../components/LeftSideBar/LeftSideBar';
import GiftsView from './GiftsView';
import ChildTaskPage from '../components/ChildTaskPage/ChildTaskPage';
import HabitsList from '../components/HabitsList/HabitsList';
import TaskList from '../components/TaskList/TaskList';
import Container from '../components/Container/Container';

class HomeView extends Component {
  render() {
    const { match } = this.props;
    return (
      <>
        <LeftSideBar familyRenderAnotherLinks={this.props.familyRenderAnotherLinks} family={this.props.family} />
        <Container>
          <Route path={`${match.path}`} exact>
            <HabitsList />
            <TaskList />
          </Route>
          <Route path={`${match.path}/gifts`} component={GiftsView} />
          <Route path={`${match.path}/child`}>
            <ChildTaskPage />
          </Route>
        </Container>
      </>
    );
  }
}

export default HomeView;
