import React from 'react';

const HistoryContext = React.createContext(null);

export const withHistory = Component => props => (
    <HistoryContext.Consumer>
        {value => <Component {...props} history={value} />}
    </HistoryContext.Consumer>
);

export default HistoryContext;
