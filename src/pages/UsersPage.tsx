import React from 'react';
import { useUserStore } from '../store/userStore';
import { UserList } from '../components/users/UserList';
import { UserForm } from '../components/users/UserForm';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function UsersPage() {
  const [showAddForm, setShowAddForm] = React.useState(false);
  const { users } = useUserStore();
  const { t } = useTranslation();

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('users.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('users.description')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            onClick={() => setShowAddForm(true)}
            icon={Plus}
          >
            {t('users.addUser')}
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="mt-6">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {t('users.newUser')}
              </h3>
              <div className="mt-5">
                <UserForm
                  onSubmit={() => setShowAddForm(false)}
                  onCancel={() => setShowAddForm(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <UserList users={users} />
      </div>
    </div>
  );
}