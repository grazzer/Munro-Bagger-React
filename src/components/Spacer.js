//https://eduardogomez.io/blog/use-a-spacer-component-instead-of-margin-with-react-native/

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({ horizontal, size }) => {
    const defaultValue = 'auto';

    return (
        <View
            style={{
                width: horizontal ? size : defaultValue,
                height: !horizontal ? size : defaultValue,
            }}
        />
    );
};

// Spacer.propTypes = {
//     size: PropTypes.oneOfType([
//         PropTypes.number,
//         PropTypes.string
//     ]).isRequired,
//     horizontal: PropTypes.bool,
// };

// Spacer.defaultProps = {
//     horizontal: false,
// };

export default Spacer;