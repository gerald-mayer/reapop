import React, {RefObject} from 'react'
import {render} from '@testing-library/react'

import {POSITIONS, STATUSES} from '../../constants'

import FadeTransition from '../FadeTransition'

describe('<FadeTransition/>', () => {
    it('should display notification', () => {
        const baseNotification = {
            id: '1',
            position: POSITIONS.topLeft,
            status: STATUSES.none,
            buttons: [],
        }
        const nodeRef = {
            current: {
                animate: jest.fn(),
            },
        }
        // Assert enter animation
        const {container, rerender} = render(
            <FadeTransition
                mountOnEnter
                appear
                in
                notification={baseNotification}
                nodeRef={nodeRef as unknown as RefObject<HTMLElement>}
            >
                <div>notification</div>
            </FadeTransition>
        )
        expect(container.innerHTML).toMatchSnapshot()
        expect(nodeRef.current.animate.mock.calls).toMatchSnapshot()
        jest.resetAllMocks()

        // Assert exit animation
        rerender(
            <FadeTransition
                mountOnEnter
                appear
                in={false}
                notification={baseNotification}
                nodeRef={nodeRef as unknown as RefObject<HTMLElement>}
            >
                <div>notification</div>
            </FadeTransition>
        )
        expect(container.innerHTML).toMatchSnapshot()
        expect(nodeRef.current.animate.mock.calls).toMatchSnapshot()
        jest.resetAllMocks()
    })
})
