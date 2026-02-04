import React, { useState } from 'react';

const WarehouseFilterPreview = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('전체');
  const [showDropdown, setShowDropdown] = useState(false);

  // 실제 창고 목록 (업로드된 파일 기준)
  const warehouses = [
    '전체',
    '수원영업창고',
    '수원사출품창고',
    '화성부품창고',
    '반품창고',
    '수원부품창고',
    '외주가공창고',
    '공정창고',
    '화성부자재창고',
    'SPARE'
  ];

  // 샘플 재고 데이터
  const sampleInventory = [
    { code: 'DJA2B0LQAAA1', name: 'JA PE2_COVER-INDICATOR_AT_LHD_QS1_0', warehouse: '수원영업창고', qty: 56 },
    { code: 'DJA2B8LQAAA1', name: 'JA PE2_COVER-INDICATOR_AT_LHD_QS1_8', warehouse: '수원영업창고', qty: 28 },
    { code: 'ABC123456789', name: '사출품-A타입', warehouse: '수원사출품창고', qty: 150 },
    { code: 'DEF987654321', name: '부품-B타입', warehouse: '화성부품창고', qty: 320 },
    { code: 'GHI456789123', name: '부자재-C타입', warehouse: '화성부자재창고', qty: 89 },
    { code: 'JKL789123456', name: '외주품-D타입', warehouse: '외주가공창고', qty: 45 },
  ];

  // 필터링된 재고
  const filteredInventory = selectedWarehouse === '전체'
    ? sampleInventory
    : sampleInventory.filter(item => item.warehouse === selectedWarehouse);

  // 창고별 품목 수 계산
  const getWarehouseCount = (wh) => {
    if (wh === '전체') return sampleInventory.length;
    return sampleInventory.filter(item => item.warehouse === wh).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 헤더 */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">MRP 시스템</h1>
            <p className="text-sm text-gray-500">파일 업로드 - 창고 필터 기능 추가</p>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 기존 업로드 존 - BOM */}
        <div className="bg-white rounded-xl shadow p-6 opacity-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📋</span>
            <h3 className="font-bold">BOM (자재명세서)</h3>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-400">기존 업로드 영역</p>
          </div>
        </div>

        {/* ⭐ 개선된 재고 현황 업로드 존 */}
        <div className="bg-white rounded-xl shadow p-6 ring-2 ring-blue-500">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📦</span>
            <h3 className="font-bold text-blue-600">재고 현황</h3>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">개선</span>
          </div>

          {/* 업로드 존 */}
          <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-6 text-center mb-4">
            <p className="text-blue-600 font-medium">✓ 창고별재고현황.xlsx 업로드됨</p>
            <p className="text-xs text-blue-400 mt-1">2,856행 · 10개 창고 감지됨</p>
          </div>

          {/* ⭐ 새로운 창고 선택 필터 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏭 창고 선택 <span className="text-blue-500">(NEW!)</span>
            </label>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-400 transition-colors"
            >
              <span className="font-medium">{selectedWarehouse}</span>
              <span className="text-gray-400">▼</span>
            </button>

            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {warehouses.map((wh) => (
                  <button
                    key={wh}
                    onClick={() => {
                      setSelectedWarehouse(wh);
                      setShowDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-blue-50 flex justify-between items-center ${
                      selectedWarehouse === wh ? 'bg-blue-100 text-blue-700' : ''
                    }`}
                  >
                    <span>{wh}</span>
                    <span className="text-xs text-gray-400">{getWarehouseCount(wh)}개</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 선택된 창고 정보 */}
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-700 text-sm">
              ✓ <strong>{selectedWarehouse}</strong> 선택됨 · {filteredInventory.length}개 품목
            </p>
          </div>
        </div>

        {/* 기존 업로드 존 - 영업계획 */}
        <div className="bg-white rounded-xl shadow p-6 opacity-50">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📊</span>
            <h3 className="font-bold">영업계획</h3>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-400">기존 업로드 영역</p>
          </div>
        </div>
      </div>

      {/* ⭐ 필터링된 재고 미리보기 */}
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">
            📋 재고 미리보기
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({selectedWarehouse} · {filteredInventory.length}개 품목)
            </span>
          </h3>
          {selectedWarehouse !== '전체' && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              🏭 {selectedWarehouse} 필터 적용됨
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">품목코드</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">품목명</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">창고명</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">재고수량</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">{item.code}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{item.warehouse}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{item.qty.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 동작 설명 */}
      <div className="mt-6 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-blue-800 mb-3">🔧 개선 사항</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>재고 파일 업로드 시 <strong>'창고명'</strong> 컬럼 자동 감지</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>드롭다운에서 원하는 창고 선택 가능 (전체 포함)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>선택된 창고의 재고만 MRP 분석에 사용</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>MRP 페이지에서도 창고 필터 상태 유지</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WarehouseFilterPreview;
