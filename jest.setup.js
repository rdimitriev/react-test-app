import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FetchMock from 'jest-fetch-mock'

configure({ adapter: new Adapter() })

FetchMock.enableMocks()
