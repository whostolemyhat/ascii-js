import React from 'react';
import AsciiApp from 'AsciiApp/AsciiApp';
import utils from 'react/lib/ReactTestUtils';

describe('AsciiApp', () => {
    it('renders', () => {
        const element = utils.render(<AsciiApp />);
        expect(element).toBeTruthy();
    });
});