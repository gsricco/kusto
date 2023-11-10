import { ChangeEvent, useState } from 'react'

import { useMutation } from '@apollo/client'
import { SelectStatusAdmin } from 'features/admin/SelectStatusAdmin'
import styled from 'styled-components'

import { GET_USERS, UPDATE_USER_STATUS } from '../../../../assets/apollo/users'
import { ThemeButton } from '../../../enums/themeButton'
import { Button } from '../../Button/Button'
import Modal from '../ModalPublic/Modal'

type AdminBlockPropsType = {
  ban: boolean
  id: string
  isOpenModalBlock: boolean
  setIsOpenModalBlock: (isOpenModalBlock: boolean) => void
  userName: string
}

export const ModalAdminBlockUser = ({
  ban,
  isOpenModalBlock,
  setIsOpenModalBlock,
  id,
  userName,
}: AdminBlockPropsType) => {
  const [blockUser] = useMutation(UPDATE_USER_STATUS, {
    variables: {
      userId: id,
      banStatus: !ban,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const [selected, setSelected] = useState('Reason for ban')

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)
  }

  const onClose = () => {
    setIsOpenModalBlock(false)
  }
  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => {
    setHovered(false)
  }

  const handleMouseLeave = () => {
    setHovered(true)
  }

  const handleBlock = () => {
    blockUser().then(() => setIsOpenModalBlock(false))
  }

  return isOpenModalBlock ? (
    <Modal
      handleModalClose={onClose}
      height={ban ? '220px' : '250px'}
      title="Block user"
      width="378px"
      bodyText={
        ban
          ? `Are you sure want to un-ban, ${userName}`
          : `Are you sure to ban this user, ${userName}?`
      }
    >
      <Column>
        {!ban && (
          <SelectStatusAdmin
            handleSelect={handleSelect}
            initialValue="Reason for ban"
            options={['Bad behavior', 'Advertising placement', 'Another reason']}
            selected={selected}
          />
        )}
        <Row>
          <Button
            theme={hovered ? ThemeButton.PRIMARY : ThemeButton.OUTLINED}
            width="96px"
            onClick={onClose}
            onMouseEnter={handleMouseLeave}
            onMouseLeave={handleMouseEnter}
          >
            No
          </Button>
          <Button
            theme={hovered ? ThemeButton.OUTLINED : ThemeButton.PRIMARY}
            width="96px"
            onClick={() => handleBlock()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Yes
          </Button>
        </Row>
      </Column>
    </Modal>
  ) : null
}

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  right: 0;
  align-self: left;
  gap: 30px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
