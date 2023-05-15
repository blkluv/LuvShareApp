
import DropMenu from '@/components/UI/DropMenu'
import { Menu } from '@headlessui/react'
import usePersistStore from '@/store/persist'

import clsx from 'clsx'
import React from 'react'
import { CustomNotificationsFilterEnum } from '@/utils/custom-types'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

const NotificationsFilter = () => {
  const selectedNotificationsFilter = usePersistStore(
    (state) => state.selectedNotificationsFilter
  )
  const setSelectedNotificationsFilter = usePersistStore(
    (state) => state.setSelectedNotificationsFilter
  )

  return (
    <DropMenu
      trigger={<Cog6ToothIcon className="h-4 w-4 opacity-70 hover:opacity-100" />}
    >
      <div className="bg-secondary mt-1 overflow-hidden rounded-xl border border-gray-200 p-1 text-sm shadow dark:border-gray-800">
        <Menu.Item
          className={clsx(
            'w-full rounded-lg px-3 py-1.5 text-left',
            selectedNotificationsFilter ===
              CustomNotificationsFilterEnum.HIGH_SIGNAL
              ? 'bg-gray-100'
              : 'opacity-60 hover:opacity-100'
          )}
          onClick={() =>
            setSelectedNotificationsFilter(
              CustomNotificationsFilterEnum.HIGH_SIGNAL
            )
          }
          as="button"
        >
          <span className="whitespace-nowrap">
           High signal
          </span>
        </Menu.Item>
        <Menu.Item
          className={clsx(
            'w-full rounded-lg px-3 py-1.5 text-left',
            selectedNotificationsFilter ===
              CustomNotificationsFilterEnum.ALL_NOTIFICATIONS
              ? 'bg-gray-100'
              : 'opacity-60 hover:opacity-100'
          )}
          onClick={() =>
            setSelectedNotificationsFilter(
              CustomNotificationsFilterEnum.ALL_NOTIFICATIONS
            )
          }
          as="button"
        >
          <span className="whitespace-nowrap">
           Show all
          </span>
        </Menu.Item>
      </div>
    </DropMenu>
  )
}

export default NotificationsFilter
