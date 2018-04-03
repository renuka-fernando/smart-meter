import React from 'react';
import PropType from 'prop-types';

const PageNotFound = (props) => {
    return (
        <div>
            <div className='message message-danger'>
                <h4>
                    <i className='icon fw fw-error' />404 Page Not Found!
                </h4>
                <p>
                    Sorry the page you are looking for{' '}
                    <span style={{ color: 'green' }}> {props.location.pathname} </span>
                    is not available.
                </p>
            </div>
        </div>
    );
};

PageNotFound.propTypes = {
    location: PropType.shape({
        pathname: PropType.string,
    }).isRequired,
};

export default PageNotFound;
