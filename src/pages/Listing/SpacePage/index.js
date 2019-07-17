import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CancellationTab from './CancellationTab'
import BookingTab from './BookingTab'
import SpecificationTab from './SpecificationTab'
import AvailabilityTab from './AvailabilityTab'
import { Wrapper, Tab, TabItem, StepButtons } from 'components'

const SpacePage = ({ match, location, ...props }) => {
  return (
    <Wrapper>
      <Tab>
        <TabItem nav to={`${match.url}/specification`}>
          Specification
        </TabItem>
        <TabItem nav to={`${match.url}/booking`}>
          Booking
        </TabItem>
        <TabItem nav to={`${match.url}/availability`}>
          Availability
        </TabItem>
        <TabItem nav to={`${match.url}/cancellation`}>
          Cancelation Policy
        </TabItem>
      </Tab>

      <Switch>
        <Redirect exact from={match.path} to={`${match.path}/specification`} />
        <Route path={`${match.path}/specification`} component={SpecificationTab} />
        <Route path={`${match.path}/booking`} component={BookingTab} />
        <Route path={`${match.path}/availability`} component={AvailabilityTab} />
        <Route path={`${match.path}/cancellation`} component={CancellationTab} />
        <Route component={() => <h1>not found</h1>} />
      </Switch>
      <StepButtons
        prev={{ disabled: false, onClick: () => props.history.goBack() }}
        next={{
          onClick: () => props.history.push('/listing/pricing')
        }}
      />
    </Wrapper>
  )
}

export default SpacePage